import cardBack from '../img/card_back.png';

export interface ArticleInterface {
  id: string;
  image_url: string;
  title: string;
  content: string;
  grade: number;
  choice: number;
  quality: number;
}

export const defaultArticle: ArticleInterface = {
  id: 'xxx',
  image_url: cardBack,
  title: 'You have reviewed all cards',
  content: 'Please check your score below',
  grade: 0,
  choice: 0,
  quality: 1,
};
