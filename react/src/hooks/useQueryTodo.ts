import { useQuery } from "../lib/swr";
import { FetchPostResponse, FetchPostsResponse } from "../types/post";

export const useFetchPosts = () => {
  return useQuery<object, FetchPostsResponse>(`/posts`, {});
};

export const useFetchPost = (postId: string) => {
  return useQuery<object, FetchPostResponse>(`/posts/${postId}`, {});
};
