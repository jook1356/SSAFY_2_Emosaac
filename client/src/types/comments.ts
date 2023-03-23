export type returnCommentArrayType = {
    "commentId": number;
    "content": string;
    "writerInfo": {
      "userId": string;
      "nickname": string;
      "profileImg": string;
    },
    "parentWriterNickName": string | null;
    "depth": number;
    "createdDate": string;
    "modifiedDate": string;
    "isDelete": boolean;
    "isChild": boolean;
  }[]

  
export type CommentType = {
"commentId": number;
"content": string;
"writerInfo": {
    "userId": string;
    "nickname": string;
    "profileImg": string;
},
"parentWriterNickName": string | null;
"depth": number;
"createdDate": string;
"modifiedDate": string;
"isDelete": boolean;
"isChild": boolean;
}