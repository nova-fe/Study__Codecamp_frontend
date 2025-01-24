'use client';

import { IBoxProps } from './types';

export default function MyBox({ children, school }: IBoxProps) {
  return (
    <>
      <div>++++++++ (박스) 사과 바나나 딸기 ++++++++</div>
      <div>{school}</div>
      <div>{children}</div>
      <div>++++++++ (박스) 사과 바나나 딸기 ++++++++</div>
    </>
  );
}

// export default function MyBox({
//   children,
//   school,
// }: {
//   children: React.ReactNode;
//   school: string;
// }) {
//   return (
//     <>
//       <div>++++++++ (박스) 사과 바나나 딸기 ++++++++</div>
//       <div>{school}</div>
//       <div>{children}</div>
//       <div>++++++++ (박스) 사과 바나나 딸기 ++++++++</div>
//     </>
//   );
// }
