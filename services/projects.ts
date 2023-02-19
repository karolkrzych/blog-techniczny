import { getList } from 'lib/markdownParser';
import { ProjectContent } from 'types/projects';

export const getAllProjects = (): ProjectContent[] => {
    const projects = getList('_projects');

    return projects.sort((a, b) => a.createdAt - b.createdAt).reverse();
};
