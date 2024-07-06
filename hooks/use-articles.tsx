import blogConfig from "@/blog.config";
import { Article } from "@/types";
import { useClientSWR } from "next-zod-router/swr";

export const useArticles = ({
  categoryId,
  tagId,
  current,
  defaultArticles,
}: {
  current: number;
  categoryId?: string;
  tagId?: string;
  defaultArticles: Article[];
}) => {
  const articlePromises = blogConfig.use.map(async (source) => {
    if (source === "notion") {
      const { data, error } = await useClientSWR("/api/notion/articles", {
        query: {
          categoryId,
          tagId,
          current: `${current}`,
        },
      });
      return {
        articles: (data?.articles ?? defaultArticles) as Article[],
        isLoading: !error && !data,
        isError: error,
      };
    } else if (source === "mdx") {
      return {
        articles: defaultArticles,
        isLoading: false,
        isError: false,
      };
    }
  });

  return articlePromises;
};
