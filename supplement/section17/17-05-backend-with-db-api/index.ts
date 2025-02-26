import { DataSource } from "typeorm";
import { Board } from "./Board";

console.log("백엔드 프로그램을 실행합니다");

console.log("여기서 API를 만들거예요");
// ...
// ...

console.log("여기서 DB에 접속하고, 테이블을 만들거예요");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "34.64.244.122", // DB가 있는 컴퓨터의 IP 주소
  port: 5001, // DB가 있는 컴퓨터의 port
  username: "postgres",
  password: "postgres2022",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [Board],
})

AppDataSource.initialize()
    .then(() => {
      console.log('DB접속에 성공했습니다. 동기화 할게요!');
    })
    .catch( (error) => {
      console.log('DB접속에 실패했습니다!!!');
      console.log('원인: ' + error);
    }

    )