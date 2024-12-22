import { useSWRConfig } from "swr";
import { useFetchPost, useFetchPosts } from "./hooks/useQueryTodo";
import { AxiosError } from "axios";
import { useCreatePost } from "./hooks/useMutationTodo";
import { useState } from "react";
import { PostCard } from "./components/PostCard";

function App() {
  const [createTitle, setCreateTitle] = useState("");
  const [createBody, setCreateBody] = useState("");

  const { data: getAllPost } = useFetchPosts();
  const { data: getPost } = useFetchPost("2");
  const { cache } = useSWRConfig();
  console.log(cache);
  console.log(getPost);

  const { trigger: createPost, isMutating: isCreatePost } = useCreatePost();

  return (
    <div className='m-6'>
      <div className='flex gap-2 border p-4 mb-10'>
        <label className='flex flex-col gap-1'>
          title
          <input
            className='border'
            type='text'
            value={createTitle}
            onChange={(e) => setCreateTitle(e.target.value)}
          />
        </label>
        <label className='flex flex-col gap-1'>
          body
          <input
            className='border'
            type='text'
            value={createBody}
            onChange={(e) => setCreateBody(e.target.value)}
          />
        </label>
        <button
          className='border px-4 py-2 rounded'
          disabled={isCreatePost}
          onClick={async () => {
            try {
              await createPost({
                body: createBody,
                title: createTitle,
                userId: 1,
              });
            } catch (e: unknown) {
              if (e instanceof AxiosError) {
                console.error(e.message);
              }
            }
          }}
        >
          create Post
        </button>
      </div>
      <div className='space-y-2'>
        {getAllPost?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;
