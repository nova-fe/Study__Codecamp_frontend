'use client';

export default function MyBox({ children }) {
  return (
    <>
      <div>++++++++ (박스) 사과 바나나 딸기 ++++++++</div>
      <div>{children}</div>
      <div>++++++++ (박스) 사과 바나나 딸기 ++++++++</div>
    </>
  );
}
