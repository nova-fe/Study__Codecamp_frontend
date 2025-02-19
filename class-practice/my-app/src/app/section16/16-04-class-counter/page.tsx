'use client';

import { Component } from 'react';

export default class ClassCounterPage extends Component {
  // class 컴포넌트 안에선 state가 하나의 묶음으로 되어있음
  state = {
    count: 1,
  };

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
          카운트 올리는 버튼
        </button>
      </>
    );
  }
}
