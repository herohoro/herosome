import blogConfig from "@/blog.config";
import { Article } from "@/types";
import matter from "gray-matter";
import fs from "fs";
import { serialize } from 'next-mdx-remote/serialize';

export const getArticlesFromFile = () => {
  // Get articles from folder
  const entries = ((ctx: any) => {
    const keys = ctx.keys();
    const data = keys
      .filter((key) => key.startsWith("contents/"))
      .map((key, index) => {
        // Create slug from filename
        const filePath = `./${key}`;
        const paths = key.split("/");
        paths.pop();
        const slug = paths.pop();
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data: extra, content } = matter(fileContents);
        extra.id = "";
        extra.description = extra.description || "";

        if (extra.date instanceof Date) {
          extra.date = extra.date.toISOString().split("T")[0];
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
  const article = articles.filter((p) => {
    return p.slug === slug;
  });
  const { data,content,source } = article[0];
  const { related } = data;
  const mdxSource = await serialize(content);

  return {
    article: {
      content: mdxSource,
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
