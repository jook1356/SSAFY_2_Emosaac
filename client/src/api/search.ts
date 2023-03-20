import { defaultAxiosInstance } from "./instance";

interface Search {
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
}

interface Pages {
  prevId: number;
  prevScore: number;
  size: number;
}

async function getListByContent(
  type: string,
  content: string,
  pages: Pages
): Promise<
  | {
      bookId: number;
      platform: number;
      thumbnail: string;
      title: string;
      author: string;
      href: string;
      score: number;
    }[]
  | null
> {
  try {
    const { data }: { data: Search } = await defaultAxiosInstance.get(
      `/search/title/${type}/${content}?prevId=${pages.prevId}&prevScore=${pages.prevScore}&size=${pages.size}`
    );
    if (data.status === 200) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default { getListByContent };
