const 영희의인풋 = () => {
  const 나만의초기메시지 = "비밀번호를 입력해주세요.";

  // 어차피 바벨이 변수까지 다 합쳐서 HTML로 바꿔줌
  return <input type="text" placeholder={나만의초기메시지} />;
};
