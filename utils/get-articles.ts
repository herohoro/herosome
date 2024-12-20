import blogConfig from "@/blog.config";
import { Article } from "@/types/";
import { getArticlesFromFile, getArticleFromFile } from "./file";
import { getArticleFromNotion, getDatabase } from "./notion";

export const getArticles = async (): Promise<Article[]> => {
  const articlePromises = blogConfig.use.map(async (source) => {
    if (source === "notion") {
      const notionArticles = await getDatabase(
        process.env.NOTION_DATABASE_ID as string,
        {
          sorts: [
            {
              property: "rEYP",
              direction: "descending",
            },
          ],
        }
      );
      // 各記事にソース情報を追加
      return notionArticles.map((article) => ({
        ...article,
      }));
    } else if (source === "mdx") {
      const mdxArticles = await getArticlesFromFile();
      // 各記事にソース情報を追加
      return mdxArticles.map((article) => ({
        ...article,
      }));
    }
  });

  const articlesArrays = await Promise.all(articlePromises);
  const articles = articlesArrays.flat();

  return articles;
};

export  const getFilteredSortArticles = async({
    categoryId,
    tagId
  }: {
    categoryId?: string;
    tagId?: string;
  }) => {
  const articles = await getArticles();
  const results = articles
    .filter(({ data }) => data.status === "open")
    .filter(({ data }) => {
      if (!categoryId) {
        return true;
      }
      return data.category === categoryId;
    })
    .filter(({ data }) => {
      if (!tagId) {
        return true;
      }
      return data.tags.some((t) => t === tagId);
    })
    .sort((articleA, articleB) => {
      if (articleA.data.date > articleB.data.date) {
        return -1;
      }
      return 1;
    })

  return results;
};

// getSlicedArticlesにしたいところ
export const getFilteredSliceArticles = async ({
  current, categoryId, tagId
}: {
  current: number;
  categoryId?: string;
  tagId?: string;
}) => {
  const articles = await getFilteredSortArticles({categoryId,
    tagId});
  const results = articles
    .slice(
      current * blogConfig.article.articlesPerPage,
      current * blogConfig.article.articlesPerPage +
        blogConfig.article.articlesPerPage
    )
    .map((article) => {
      const { content, ...others } = article;
      return others;
    });
  return results;
};

export const getArticle = async (
  slug: string
): Promise<{
  article: Article;
  related: Article[];
}> => {
  const articles = await getArticles();

  const article = articles.find((article) => article.slug === slug);

  if (article.source === "notion") {
    return getArticleFromNotion(slug);
  } else if (article.source === "mdx") {
    return getArticleFromFile(slug);
  }
};
