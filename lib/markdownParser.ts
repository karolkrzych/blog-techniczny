import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { ProjectContent } from 'types/projects';
import { ArticleContent } from 'types/articles';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

export const getList = (path: string): ProjectContent[] | ArticleContent[] => {
    const directory = join(process.cwd(), path);
    const files = fs.readdirSync(directory);

    return files.map((file) => {
        const fullPath = join(directory, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        const content = data as ProjectContent;

        const projectContent: ProjectContent = {
            ...content,
            slug: file.replace('.md', ''),
            createdAt: Number(new Date(data.date)),
        };

        return projectContent;
    });
};

export const getFileBySlug = async (
    path: string,
    slug: string
): Promise<ArticleContent> => {
    const directory = join(process.cwd(), path);
    const fullPath = join(directory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content: markdownContent } = matter(fileContents);
    let content = '';

    if (markdownContent) {
        const contentVF = await remark()
            .use(html)
            .use(prism)
            .process(markdownContent);
        content = contentVF.toString();
    }

    const articleVariables = data as ArticleContent;

    const artcitleContent: ArticleContent = {
        ...articleVariables,
        content,
        slug,
        createdAt: Number(new Date(data.date)),
    };

    return artcitleContent;
};
