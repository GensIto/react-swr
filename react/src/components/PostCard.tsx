import { AxiosError } from "axios";
import { useState } from "react";
import { useUpdatePost, useDeletePost } from "../hooks/useMutationTodo";
import { Post } from "../types/post";

export const PostCard = ({ post }: { post: Post }) => {
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");

  const { trigger: updatePost, isMutating: isUpdatePost } = useUpdatePost();
  const { trigger: deletePost, isMutating: isDeletePost } = useDeletePost();
  return (
    <div className=' space-y-2 border p-4'>
      <h2 className='text-lg font-bold'>{post.title}</h2>
      <p>{post.body}</p>
      <div className='flex gap-2'>
        <label className='flex flex-col gap-1'>
          title
          <input
            className='border'
            type='text'
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
        </label>
        <label className='flex flex-col gap-1'>
          body
          <input
            className='border'
            type='text'
            value={updateBody}
            onChange={(e) => setUpdateBody(e.target.value)}
          />
        </label>
      </div>

      <div className='flex gap-2'>
        <button
          className='border px-4 py-2 rounded'
          disabled={isUpdatePost}
          onClick={async () => {
            try {
              await updatePost({
                body: updateBody,
                title: updateTitle,
                userId: post.userId,
                urlParams: { postId: post.id.toString() },
              });
            } catch (e: unknown) {
              if (e instanceof AxiosError) {
                console.error(e.message);
              }
            }
          }}
        >
          Update Post
        </button>
        <button
          className='border px-4 py-2 rounded'
          disabled={isDeletePost}
          onClick={async () => {
            try {
              await deletePost({
                urlParams: { postId: post.id.toString() },
              });
            } catch (e: unknown) {
              if (e instanceof AxiosError) {
                console.error(e.message);
              }
            }
          }}
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};
