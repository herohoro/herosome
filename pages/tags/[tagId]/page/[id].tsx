import { NextSeo } from "next-seo";
import { Layout } from "@/components/layout";
import {
  LatestArticle,
  AritcleColumn,
  ArticleList,
} from "@/components/articles";
import { ArticleCard } from "@/components/articles/card";
import { Title } from "@/components/texts";
import { getArticles, getFilteredSliceArticles, getFilteredSortArticles } from "@/utils/get-articles";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Article, Tag } from "@/types";
import blogConfig from "@/blog.config";
import { Wrapper } from "@/components/common/wrapper";
import { Pager } from "@/components/pager";
import { useArticles } from "@/hooks/use-articles";
import { NotFound } from "@/components/common/not-found";

type Props = {
  tag: Tag;
  articles: Article[];
  current: number;
  max: number;
};

const TagPage: NextPage<Props> = (props) => {
  const { tag, articles: defaultArticles, current, max } = props;
  if (!defaultArticles || defaultArticles.length === 0) {
    return <NotFound />;
  }

  const { articles } = useArticles({
    defaultArticles,
    current,
    tagId: tag.id,
  });

  return (
    <Layout>
      <div className="tag">
        <Title>{tag.title}</Title>
      </div>
      <Wrapper>
        <ArticleList>
          <LatestArticle>
            {articles.map((article) => (
              <AritcleColumn key={article.slug} column={3}>
                <ArticleCard
                  article={article.data}
                  source={article.source}
                  href={`/${article.data.category}/${article.slug}`}
                />
              </AritcleColumn>
            ))}
          </LatestArticle>
          <Pager current={current} max={max} append={`/tags/${tag.id}`} />
        </ArticleList>
      </Wrapper>
      <style jsx>
        {`
          .link-button-wrap {
            text-align: center;
            margin-top: 30px;
          }
          .tag {
            margin-top: 50px;
          }
        `}
      </style>
      <NextSeo canonical={`${blogConfig.siteUrl}${tag.id}`} />
    </Layout>
  );
};

export default TagPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles();
  const paths = [];
  const map = new Map<string, number>();
  articles.forEach((article, index) => {
    article.data.tags.forEach((t) => {
      const tagNum = map.get(t) ? map.get(article.data.category) + 1 : 1;
      map.set(t, tagNum);
      if (tagNum % blogConfig.article.articlesPerPage === 0) {
        paths.push({
          params: {
            id: `${tagNum / blogConfig.article.articlesPerPage + 1}`,
            tagId: t,
          },
        });
      }
    });
  });
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { tagId, id } = params;
  const tag = blogConfig.tags.find((c) => c.id === tagId);
  const current = parseInt(id as string, 10) - 1;
  const articles = await getFilteredSortArticles({ tagId: tag.id })

  const slicedPosts = await getFilteredSliceArticles({ current, tagId: tag.id})
  return {
    revalidate: 60,
    props: {
      current: current + 1,
      max: Math.ceil(articles.length / blogConfig.article.articlesPerPage),
      tag,
      articles: slicedPosts,
    },
  };
};
