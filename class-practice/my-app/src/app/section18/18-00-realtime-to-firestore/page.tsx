"use client"

import { fetchPosts } from '@/api/firestore/boards';
import { useEffect, useState } from 'react';

export default function ImageUploadPage() {
  const [posts, setPosts] = useState<{ id: string }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPosts();
      setPosts(data);
    }
    loadData();
  }, []);
  

  return (
    <>
      {
        posts?.map((post) => (
          <div key={post.id}>{post.title}</div>
        ))
      }
    </>
  )
};
