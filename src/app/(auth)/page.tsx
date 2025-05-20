'use client';
import { useDispatch, useSelector } from 'react-redux'; //useSelector to fetch data from store
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { addPost, deletePost } from '@/store/slices/postSlice';

export default function Home() {
  const dispatch = useDispatch(); // to delete or update or add
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const posts = useSelector((state: any) => state.posts);
  const handleRemovePost = (id: any) => {
    dispatch(deletePost(id));
  };
  const handleAddNewPost = () => {
    let idCounter = id + 1;
    setId(idCounter);
    setName(`New Post at number ${idCounter}`);
    dispatch(addPost({ id, name }));
  };
  return (
    <div>
      <h1>Welcome to My App</h1>
      <a href='/signin'>Go to Login</a>
      {posts.map((post: any) => (
        <div className='d-flex m-1 rounded-sm bg-gray-100 p-4' key={post.id}>
          {post.name}
          <Button onClick={() => handleRemovePost(post.id)}>Delete</Button>
          <Button onClick={() => handleAddNewPost()}>Add New</Button>
        </div>
      ))}
    </div>
  );
}
