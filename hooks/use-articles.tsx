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

  useEffect(() => {
    const fetchArticles = async () => {
      const articlePromises = blogConfig.use.map(async (source) => {
        if (source === "notion") {
          try {
            const { data } = await useSWR(`/api/notion/articles`, {
              fetcher,
              query: {
                categoryId,
                tagId,
                current: `${current}`,
              },
            });
            return {
              articles: (data?.articles ?? defaultArticles) as Article[],
              isLoading: false,
              isError: false,
            };
          } catch (error) {
            console.error("SWR fetch error:", error);
            return {
              articles: defaultArticles,
              isLoading: false,
              isError: true,
            };
          }
        } else if (source === "mdx") {
          return {
            articles: defaultArticles,
            isLoading: false,
            isError: false,
          };
        }
      });

      // 非同期処理が完全に(Promise)全て(.all)終わるまで待機する
      const fetchedArticles = await Promise.all(articlePromises);
      console.log("すべての処理が完了した", fetchedArticles);

      // データソースから取得した記事を統合してセットする
      const mergedArticles = fetchedArticles.reduce((acc, curr) => {
        return acc.concat(curr.articles);
      }, [] as Article[]);
      setArticles(mergedArticles);
    };

    fetchArticles();
  }, [categoryId, tagId, current, defaultArticles]);
  console.log("最後：", { articles });
  return { articles };
};
