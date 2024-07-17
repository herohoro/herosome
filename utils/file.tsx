import blogConfig from "@/blog.config";
import { Article } from "@/types";
import { renderToString } from "react-dom/server";
import matter from "gray-matter";
import fs from "fs";
import path from "path";

const mdxExists = (filePath: string) => {
  try {
    fs.accessSync(filePath, fs.constants.R_OK);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  }
};

const isFileType = (filePath, type) => {
  return filePath.endsWith(`.${type}`);
};

export const getArticlesFromFile = () => {
  // Get articles from folder
  const entries = ((ctx: any) => {
    const keys = ctx.keys();

    // console.log("***** keys", keys);
    // const values = keys.map(ctx);
    // console.log("***** values", values);


    const data = keys
      .filter((key) => key.startsWith("contents/"))
      .map((key, index) => {
        // Create slug from filename
        const filePath = `./${key}`;
        const paths = key.split("/");
        paths.pop();
        // console.log("****** paths", paths);
        const slug = paths.pop();

        // console.log("****** filePath", filePath);

        const mdxFileExists = mdxExists(filePath);


        // if (!mdxFileExists) {
        //   return null; // Skip processing if MDX file doesn't exist
        // }

        const fileContents = fs.readFileSync(filePath, "utf8");

        // if (!fileContents.startsWith("---")) {
        //   console.error(`Invalid YAML front matter in file: ${filePath}`);
        //   throw new Error(`Invalid YAML front matter in file: ${filePath}`);
        // }

        const { data: extra, content } = matter(fileContents);
        // const { default: content, ...extra } = values[index];
        // console.log("***** content", content);
        // console.log("***** extra", extra);
        extra.id = "";
        extra.description = extra.description || "";

        if (extra.date instanceof Date) {
          extra.date = extra.date.toISOString();
        }

        return {
          content,
          data: extra,
          permalink: `${blogConfig.siteUrl}/${extra.category}/${slug}`,
          slug,
          id: "",
          excerpt: "",
          source: "mdx"
        };
      });
    return data.filter((item) => item !== null);
    // @ts-ignore
  })(require.context("@/contents", true, /\.mdx$/));
  const uniq = [
    // @ts-ignore
    ...new Map<string, Article>(
      entries.map((item) => [item.slug, item])
    ).values(),
  ];
  return uniq.filter((u) => {
    if (u.data.status === "open" || !u.data.status) {
      return true;
    }
    if (u.data.status === "draft" && process.env.NODE_ENV === "development") {
      return true;
    }
    return false;
  });
};

export const getArticleFromFile = async (slug: string) => {
  const articles = await getArticlesFromFile();
  console.log("****** FromFile内でのgetArtilces",articles)
  const article = articles.filter((p) => {
    return p.slug === slug;
  });

  const { data,content,source } = article[0];
  console.log("****** data",data)
  console.log("****** source",source)
  console.log("****** content",content)

  const { related } = data;
  return {
    article: {
      content: content,
      data,
      permalink: `${blogConfig.siteUrl}/${data.category}/${slug}`,
      slug,
      source
    } as unknown as Article,
    related: related
      ? articles
          .filter((p) => {
            return related.some((r) => r === p.slug);
          })
          .map((r) => {
            const { content, ...d } = r;
            return d;
          })
      : [],
  };
};
