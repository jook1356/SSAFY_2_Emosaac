export type searchBookType = {
  status: number;
  message: string;
  data: {
    bookId: number;
    platform: number;
    thumbnail: string;
    title: string;
    author: string;
    href: string;
    score: number;
  }[];
};

export type returnSearchBooksType = {
  bookId: number;
  platform: number;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  score: number;
};
