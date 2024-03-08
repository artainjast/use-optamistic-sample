import { createRoot } from 'react-dom/client';
import { useOptimistic, useState, useRef , useEffect } from "react";
import { useRequest } from './hooks/index.js';
import { getPosts,addPost } from './api/index.js';

const root = createRoot(document.getElementById('app'));

function Thread({ posts, sendPost }) {
  const formRef = useRef();

  async function formAction(formData) {
    addOptimisticPost(formData.get("post"));
    formRef.current.reset();
    await sendPost(formData);
  }
  
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [
      ...state,
      {
        title: newPost,
        id: state.length + 1,
        sending: true
      }
    ]
  );
  return (
    <>
      {optimisticPosts?.map((post, index) => (
        <div key={index} style={{
          color: !!post.sending && 'red'
        }}>
          {post.id + '. ' +  post.title}
          
          {!!post.sending && <small> (Sending...)</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="post" placeholder="add post here" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default function App() {
  const { data, isPending } = useRequest(getPosts);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    !isPending && setPosts(data)
  }, [isPending])
  
  async function sendPost(formData) {
    const sentPost = await addPost(formData.get("post"));
    setPosts((posts) => [...posts, {...sentPost}]);
  }
  return isPending
    ? <p>it's loading the posts</p>
    : <Thread posts={posts} sendPost={sendPost} />;
}


root.render(<App />);