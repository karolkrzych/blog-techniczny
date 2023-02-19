import { getList, getFileBySlug } from 'lib/markdownParser';
import { ArticleContent } from 'types/articles';

export const getListOfArticles = (): ArticleContent[] => {
    const articles = getList('_articles') as ArticleContent[];

    return articles.sort((a, b) => a.createdAt - b.createdAt).reverse();
};

export const getArticle = async (slug: string): Promise<ArticleContent> => {
    const article = await getFileBySlug('_articles', slug);
    
    return article;
};
