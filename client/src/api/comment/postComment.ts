import { defaultAxiosInstance } from "../instance";


type paramsType = {
  bookId: number;
  content: string;
  parentId: number | null;
}

type returnType = number

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function postComment({bookId, content, parentId}: paramsType
): Promise<returnType | null> {
  try {
    const { data }: { data: responseType } = await defaultAxiosInstance.post(
      `/book/comments/${bookId}`, { content, parentId }
    );
    return data.data
  } catch (error) {
    throw error
  }
}


