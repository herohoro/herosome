import blogConfig from "@/blog.config";
import { Article } from "@/types";
import { useClientSWR } from "next-zod-router/swr";

export const useArticle = (slug: string, defaultArticle: Article) => {
  if (defaultArticle.source === "mdx") {
    return {
      article: defaultArticle,
      isLoading: false,
      isError: false,
    };
  }
  const { data, error } = useClientSWR("/api/notion/article", {
    query: {
      slug,
    },
  });
  return {
    article: (data?.article ?? defaultArticle) as Article,
    isLoading: !error && !data,
    isError: error,
  };
};
