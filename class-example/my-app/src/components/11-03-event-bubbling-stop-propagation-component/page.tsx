'use client';

export default function Checkbox() {
  const qqq1 = () => {
    alert('1번 클릭!');
  };
  const qqq2 = e => {
    e.stopPropagation();
    alert('2번 클릭!');
  };

  return (
    <span onClick={qqq1}>
      <input onClick={qqq2} type="checkbox" />
    </span>
  );
}
