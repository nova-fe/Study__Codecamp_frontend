'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function StaticRoutingMovedPage() {
  // interface IProps {
  //   name: {
  //     writer: string;
  //     title: string;
  //     contents: string;
  //   };
  // }

  const [data, setData] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://nova-codecamp-board-default-rtdb.firebaseio.com/class-example.json`,
        );
        const data = response.data;

        // 데이터를 배열로 변환
        const postArray = data
          ? Object.keys(data).map(key => ({
              id: key, // 고유 ID
              ...data[key], // 데이터 내용
            }))
          : [];

        setData(postArray);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, []);

  // * 이벤트 버블링::
  // 자식을 누르면 그 부모까지 전파가 되어서 눌림

  // event.target => 내가 클릭한 태그, 예를들어 제목을 클릭했으면 제목 span 태그가 target이 됨
  // alert(e.target.id + '님이 작성한 게시글입니다.');

  // event.currentTarget => 내(span) 클릭이 버블링되면 부모의 onClick 이 실행됨
  // => currentTarget은 해당 실행된 그 태그를 칭함

  // 부모 클릭 예시
  // const onClickAlert = e => {
  //   alert(e.currentTarget.id + '님이 작성한 게시글입니다.');
  // };

  const qqq = () => {
    alert('부모 클릭!');
  };
  const qqq1 = () => {
    alert('1번 클릭!');
  };
  const qqq2 = e => {
    e.stopPropagation(); // 부모로 이벤트버블링 막음
    alert('2번 클릭!');
  };
  const qqq3 = () => {
    alert('3번 클릭!');
  };
  const qqq4 = () => {
    alert('4번 클릭!');
  };

  return (
    <div>
      {data?.map(el => (
        <div key={el.id} id={el.writer} onClick={qqq}>
          <span onClick={qqq1}>
            <input type="checkbox" />
          </span>
          <span onClick={qqq2} style={{ margin: '10px' }}>
            작성자: {el?.writer}
          </span>
          <span onClick={qqq3} style={{ margin: '10px' }}>
            제목: {el?.title}
          </span>
          <span onClick={qqq4} style={{ margin: '10px' }}>
            내용: {el?.contents}
          </span>
        </div>
      ))}
    </div>
  );
}
