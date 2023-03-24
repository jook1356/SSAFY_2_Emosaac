import { defaultAxiosInstance } from "../instance";
import { returnCommentArrayType, likeCommentType } from "@/types/comments";


type paramsType = {
  commentId: number;
}

type returnType = likeCommentType
// type returnType = {
//   "commentId": number;
//   "content": string;
//   "writerInfo": {
//     "userId": string;
//     "nickname": string;
//     "profileImg": string;
//   },
//   "parentWriterNickName": string | null;
//   "depth": number;
//   "createdDate": string;
//   "modifiedDate": string;
//   "isDelete": boolean;
//   "isChild": boolean;
// }[]

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function putLikeComment({commentId}: paramsType
): Promise<returnType | null> {
  try {
    const { data }: { data: responseType } = await defaultAxiosInstance.put(
      `/book/comments/like/${commentId}`
    );
    return data.data
  } catch (error) {
    throw error
  }
}


