'use client';

import Link from 'next/link';
import { Component } from 'react';

export default class ClassCounterPage extends Component {
  // class 컴포넌트 안에선 state가 하나의 묶음으로 되어있음
  state = {
    count: 1,
  };

  componentDidMount() {
    console.log('그려지고 나서 실행!!');
    // 예시) API 요청, 인풋 포커스 깜빡깜빡 등
  }

  componentDidUpdate() {
    console.log('변경되고 나서 실행!!');
  }

  componentWillUnmount() {
    console.log('사라지기 전에 실행!!');
    // 예시) 채팅방 나가기 API 요청, 불필요한 타이머 삭제 등 청소
  }

  // 해결방법 1) 화살표함수
  onClickCountUp = () => {
    // setState: 내장 함수
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <>
        <div>{this.state.count}</div>
        {/* 해결방법 2) 로직상의 this를 연결(.bind) */}
        <button onClick={this.onClickCountUp.bind(this)}>
          카운트 올리는 버튼!!!
        </button>

        <Link href={'/'}>나가기 버튼!!</Link>
      </>
    );
  }
}
