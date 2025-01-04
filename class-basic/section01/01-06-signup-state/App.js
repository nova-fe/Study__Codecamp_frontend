const App = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  // 이벤트 핸들러 함수
  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleClickSignup = () => {
    console.log(email);
    console.log(password);

    if (email.includes('@') === false) {
      // alert('이메일이 올바르지 않습니다. (@가 없음)');
      // document.getElementById("이메일에러표시하는곳").innerText = "이메일이 올바르지 않습니다. (@가 없음)";

      // state로 에러 보여주기
      setEmailError('이메일이 올바르지 않습니다. (@가 없음)');
    } else {
      alert('회원가입을 환영합니다.');
    }
  };

  return (
    <div className="bg-sky-200">
      이메일:
      <input
        type="text"
        onChange={handleChangeEmail}
        className="border border-gray-300"
      />
      <br />
      {/* <div id="이메일에러표시하는곳"></div> */}
      <div>{emailError}</div>
      비밀번호:
      <input
        type="password"
        onChange={handleChangePassword}
        className="border border-gray-300"
      />
      <br />
      <button onClick={handleClickSignup} className="border bg-gray-100 p-1">
        회원가입
      </button>
    </div>
  );
};
