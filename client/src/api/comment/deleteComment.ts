import { defaultAxiosInstance } from "../instance";
import { returnCommentArrayType } from "@/types/comments";


type paramsType = {
  commentId: number;
}

type returnType = number
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

export async function deleteComment({commentId}: paramsType
): Promise<returnType | null> {
  try {
    const { data }: { data: responseType } = await defaultAxiosInstance.delete(
      `/book/comments/${commentId}`
    );
    return data.data
  } catch (error) {
    throw error
  }
}


