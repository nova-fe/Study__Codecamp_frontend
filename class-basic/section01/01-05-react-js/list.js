const 목록페이지 = (props) => {
  return (
    <div>
      <div>유튜브목록입니다.</div>
      <div>유튜브영상1</div>
      <div>유튜브영상2</div>
      <div>유튜브영상3</div>
      <div>...</div>

      <span>구독자 수:</span>
      <span>{props.구독자수담는통}</span>
    </div>
  );
};
