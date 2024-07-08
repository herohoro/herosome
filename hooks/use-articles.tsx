import blogConfig from "@/blog.config";
import { Article } from "@/types";
import { useClientSWR } from "next-zod-router/swr";
import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

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
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const { data } = useSWR(
    `/api/notion/articles?categoryId=${categoryId}&tagId=${tagId}&current=${current}`,
    fetcher
  );

  useEffect(() => {
    const fetchArticles = async () => {
      const articlePromises = defaultArticles.map(async (article) => {
        if (article.source === "notion") {
          return {
            ...article,
            articles: (data?.articles ?? defaultArticles) as Article[],
            isLoading: false,
            isError: false,
          };
        } else if (article.source === "mdx") {
          return {
            ...article,
            articles: defaultArticles,
            isLoading: false,
            isError: false,
          };
        }
      });

      // 非同期処理が完全に(Promise)全て(.all)終わるまで待機する
      const fetchedArticles = await Promise.all(articlePromises);

      // データソースから取得した記事を統合してセットする

      setArticles(fetchedArticles);
    };

    fetchArticles();
  }, [categoryId, tagId, current, defaultArticles]);

  console.log("USE_最後：", { articles });
  return { articles };
};
