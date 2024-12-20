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
import { Category, Article } from "@/types";
import blogConfig from "@/blog.config";
import { CategoryHero } from "@/components/common/category-hero";
import { Wrapper } from "@/components/common/wrapper";
import { Pager } from "@/components/pager";
import { useArticles } from "@/hooks/use-articles";
import { NotFound } from "@/components/common/not-found";

type Props = {
  category: Category;
  articles: Article[];
  current: number;
  max: number;
};

const CategoryDeteil: NextPage<Props> = (props) => {
  const { category, articles: defaultArticles, current, max } = props;

  if (!defaultArticles || defaultArticles.length === 0) {
    return <NotFound />;
  }

  const { articles } = useArticles({
    defaultArticles,
    current,
    categoryId: category.id,
  });

  return (
    <Layout>
      <Wrapper>
        <CategoryHero
          title={category.title}
          image={category.imagePath}
          description={category.description}
        />
      </Wrapper>
      <Title>POSTS</Title>
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
          <Pager current={current} max={max} append={`/${category.id}`} />
        </ArticleList>
      </Wrapper>
      <NextSeo canonical={`${blogConfig.siteUrl}${category.id}`} />
    </Layout>
  );
};

export default CategoryDeteil;

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles();
  const paths = [];
  const map = new Map<string, number>();
  articles.forEach((article, index) => {
    const catNum = map.get(article.data.category)
      ? map.get(article.data.category) + 1
      : 1;
    map.set(article.data.category, catNum);
    if (catNum % blogConfig.article.articlesPerPage === 0) {
      paths.push({
        params: {
          id: `${catNum / blogConfig.article.articlesPerPage + 1}`,
          categoryId: article.data.category,
        },
      });
    }
  });
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { categoryId, id } = params;
  const category = blogConfig.categories.find((c) => c.id === categoryId);
  const current = parseInt(id as string, 10) - 1;
  const articles = await getFilteredSortArticles({ categoryId: category.id })

  const slicedPosts = await getFilteredSliceArticles({ current, categoryId: category.id})

  return {
    revalidate: 60,
    props: {
      current: current + 1,
      max: Math.ceil(articles.length / blogConfig.article.articlesPerPage),
      category,
      articles: slicedPosts,
    },
  };
};
