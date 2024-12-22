import { useMutation } from "../lib/swr";
import {
  UpdatePostRequest,
  UpdatePostResponse,
  UpdatePostUrlParams,
  DeletePostUrlParams,
  CreatePostRequest,
  CreatePostResponse,
} from "../types/post";

export const useUpdatePost = () => {
  return useMutation<
    UpdatePostRequest,
    UpdatePostResponse,
    UpdatePostUrlParams
  >("/posts/{postId}", {
    method: "PUT",
  });
};

export const useDeletePost = () => {
  return useMutation<object, object, DeletePostUrlParams>("/posts/{postId}", {
    method: "DELETE",
  });
};

export const useCreatePost = () => {
  return useMutation<CreatePostRequest, CreatePostResponse>("/posts", {
    method: "POST",
  });
};
