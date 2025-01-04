const 카운터 = () => {
  const [카운트변수, 카운트바꿔주는함수] = React.useState(0);

  const 카운트올리는함수 = () => {
    카운트바꿔주는함수(카운트변수 + 1);
  };

  const 카운트내리는함수 = () => {
    카운트바꿔주는함수(카운트변수 - 1);
  };

  // 함수의 리턴은 1개만 가능
  return (
    <>
      <div>{카운트변수}</div>
      <button onClick={카운트올리는함수}>카운트 올리기!</button>
      <button onClick={카운트내리는함수}>카운트 내리기!</button>
    </>
  );
};
