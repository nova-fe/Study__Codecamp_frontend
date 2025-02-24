'use client';

import { useEffect, useState } from 'react';

export default function RestGetPage() {
  const [imageurl, setImageurl] = useState('');

  useEffect(() => {
    const 나만의함수 = async () => {
      const result = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await result.json();
      setImageurl(data.message);
      // 응답 형식
      // {
      //   "message": "https://images.dog.ceo/breeds/hound-plott/hhh_plott002.jpg",
      //   "status": "success"
      // }
    };
    나만의함수();
  }, []);

  return <img src={imageurl} />;
}
