import { Article } from "@/types";
import { AritcleColumn, ArticleList, LatestArticle } from ".";
import { Title } from "../texts";
import { ArticleCard } from "./card";

export function Related({ related, source }: { related: Article[],source: string }) {
  return (
    <ArticleList>
      <Title>RELATED</Title>
      <LatestArticle>
        {related.map((post) => (
          <AritcleColumn key={post.slug} column={3}>
            <ArticleCard
              article={post.data}
              source={source}
              href={`/${post.data.category}/${post.slug}`}
            />
          </AritcleColumn>
        ))}
      </LatestArticle>
    </ArticleList>
  );
}
