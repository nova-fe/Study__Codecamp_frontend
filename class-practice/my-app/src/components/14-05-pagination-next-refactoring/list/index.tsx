'use client';

export default function List({ data }) {
  return (
    <div>
      {data?.map(el => (
        <div key={el.id}>
          <span style={{ margin: '10px' }}>{el?.writer}</span>
          <span style={{ margin: '10px' }}>{el?.title}</span>
        </div>
      ))}
    </div>
  )
};
