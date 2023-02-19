import Layout from 'components/Layout';
import Head from 'next/head';
import { ArticleContent } from 'types/articles';
import { getListOfArticles, getArticle } from 'services/articles';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
    slug: string;
}

interface Props {
    article: ArticleContent;
}

const Article: NextPage<Props> = ({ article }: Props) => (
    <Layout>
        <Head>
            <title>{article.title}</title>
            <link
                href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
                rel="stylesheet"
            />
        </Head>
        <div>
            <h1 className="text-center text-3xl mb-10">{article.title}</h1>
            <div
                className="max-w-3xl mx-auto articleBody"
                dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </div>
    </Layout>
);

export default Article;

export const getStaticProps: GetStaticProps = async (req) => {
    const { slug } = req.params as IParams;
    const article = await getArticle(slug);

    return {
        props: { article },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const articles = getListOfArticles();
    const paths = articles.map((art) => ({ params: { slug: art.slug } }));

    return {
        paths,
        fallback: false,
    };
};
