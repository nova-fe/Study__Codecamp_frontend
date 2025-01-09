const TypescriptExample = () => {
  // 타입 추론
  let aaa = '안녕하세요';
  aaa = 3;

  // 타입 명시
  let bbb: string = '반갑습니다';
  bbb = 10;

  // 타입명시가 필요한 상황
  let ccc: number | string = 1000;
  ccc = '1000원';

  // 숫자타입
  let ddd: number = 10;
  ddd = '철수';

  // 불린타입
  let eee: boolean = true;
  eee = false;
  eee = 'false'; // true로 작동함

  // 배열타입
  let fff: number[] = [1, 2, 3, 4, 5, '안녕하세요'];
  let hhh: (string | number)[] = ['하나', '둘', 10];

  // 객체타입
  interface IProfile {
    name: string;
    age: number | string;
    school: string;
    hobby?: string;
  }

  const profile: IProfile = {
    name: '철수',
    age: 8,
    school: '다람쥐초등학교',
  };

  profile.name = '훈이';
  profile.age = '8살';
  profile.school = '공룡초등학교';
  profile.hobby = '수영';

  // 함수타입 => 타입추론 안됨!(타입 명시 필요)
  function add(num1: number, num2: number, unit: string): string {
    return num1 + num2 + unit;
  }

  const result = add(1, 3, '원');

  const add2 = (num1: number, num2: number, unit: string): string => {
    return num1 + num2 + unit;
  };

  const result2 = add2(2, 3, '달러');

  // any타입
  let qqq: any = '철수'; // javascript와 동일
  qqq = 123;
  qqq = true;

  return <></>;
};
