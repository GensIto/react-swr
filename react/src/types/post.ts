export type Post = {
  id: number;
  body: string;
  title: string;
  userId: number;
};

export type FetchPostsResponse = Post[];

export type FetchPostResponse = Post;

export type UpdatePostRequest = {
  body: string;
  title: string;
  userId: number;
};

export type UpdatePostUrlParams = {
  postId: string;
};

export type UpdatePostResponse = {
  id: number;
};

export type DeletePostUrlParams = {
  postId: string;
};

export type CreatePostRequest = {
  body: string;
  title: string;
  userId: number;
};

export type CreatePostResponse = Post;
