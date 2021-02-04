import { ArticleInterface } from '../models/Article';
import { data, testData } from '../data/data';

export const getArticles = (): ArticleInterface[] => {
  const responses: ArticleInterface[] = [];
  data.forEach((value, index) => {
    const resp = {
      id: `${index}`,
      image_url: value.image_url,
      title: value.title,
      content: value.text,
      grade: value.grade,
      choice: 0,
    };
    responses.push(resp);
  });
  return responses;
};
