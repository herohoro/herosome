import { getArticles, getFilteredArticles } from "@/utils/get-articles";
import { Layout } from "@/components/layout";
import { Article } from "@/types";
import {
  ArticleList,
  LatestArticle,
  AritcleColumn,
} from "@/components/articles";
import { ArticleCard } from "@/components/articles/card";
import { Title } from "@/components/texts";
import { Wrapper } from "@/components/common/wrapper";
import blogConfig from "@/blog.config";
import { Hero } from "@/components/common/hero";
import { LinkButton } from "@/components/buttons";
import { useArticles } from "@/hooks/use-articles";
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { FetchDatabase, FetchDatabaseRes } from 'rotion'
import { Table } from 'rotion/ui'


// type Props = { db: FetchDatabaseRes }

const TopPage = ({
  articles: defaultArticles,
  max,
  current,
  db
}:
  InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { articles } = useArticles({ defaultArticles, current });


  return (
    <Layout>
      <Hero
        title={blogConfig.hero.title}
        description={blogConfig.hero.description}
      />
      <Wrapper>
        <main className="main">
          <ArticleList>
            <Title>{blogConfig.topPage.title}</Title>
            <LatestArticle>
              {articles.map((article) => (
                <AritcleColumn key={article.slug} column={3}>
                  <ArticleCard
                    article={article.data}
                    href={`/${article.data.category}/${article.slug}`}
                  />
                </AritcleColumn>
              ))}
            </LatestArticle>
            <div className="link-button-wrap">
              {max > 1 && (
                <LinkButton href="/page/2">
                  {blogConfig.topPage.readMoreLabel}
                </LinkButton>
              )}
            </div>
          </ArticleList>
           <Table keys={['Name', 'Date']} db={db} />
        </main>

      </Wrapper>

      <style jsx>
        {`
          .main {
            width: 100%;
          }
          .link-button-wrap {
            text-align: center;
            margin-top: 30px;
          }
        `}
      </style>
    </Layout>
  );
};

export default TopPage;

export const getStaticProps = async () => {
  const articles = await getArticles();
  const db = await FetchDatabase({ database_id: process.env.DB_ID as string })

  return {
    revalidate: 60,
    props: {
      current: 0,
      max: Math.ceil(articles.length / blogConfig.article.articlesPerPage),
      articles: await getFilteredArticles({
        current: 0,
      }),
      db,
    },
  };
};
