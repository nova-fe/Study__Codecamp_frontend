const 민지채널페이지 = (props) => {
  return (
    <div>
      <div>민지의 채널에 오신 것을 환영합니다.</div>
      <span>{props.구독자수담는통}</span>

      <button onClick={props.구독자올리는기능}>구독하기</button>
    </div>
  );
};
