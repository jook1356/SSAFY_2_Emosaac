export type bookContentType = {
  bookId: number;
  platform: number;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  score: number;
  hit: number;
  regist: string;
  genreId: number;
  genreName: string;
  typeCd: number;
};

export type returnBookContentType = {
  content: bookContentType[];
  first: boolean;
  hasNext: boolean;
  last: boolean;
  page: number;
  size: number;
};
