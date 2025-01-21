// 게시판 관련 스키마
import { z } from 'zod';

// 1.	요청 (Request):
// •	스키마: 클라이언트에서 서버로 보낼 데이터가 올바른지 확인 (parse()).
// •	타입: 클라이언트 코드에서 이 데이터가 어떤 구조를 가져야 하는지 정의.
// 2.	응답 (Response):
// •	스키마: 서버에서 받은 응답이 예상한 구조인지 확인 (parse()).
// •	타입: 서버에서 받은 데이터를 처리할 때 그 데이터가 어떤 타입을 가질지 정의.

// 게시글 데이터 스키마
export const BoardsSchema = z.object({
  contents: z.string(),
  writer: z.string(),
  title: z.string(),
  createdAt: z.string(),
  password: z.string(),
  date: z.string(),
});

/**
 * 게시판 목록 조회
 */
// 게시판 목록 조회 응답 스키마
export const FetchBoardsResponseSchema = z.record(BoardsSchema);
// 게시판 목록 조회 응답 타입
export type FetchBoardsResponse = z.infer<typeof FetchBoardsResponseSchema>;

/**
 * 게시글 등록 요청
 */
// 게시글 등록 요청 스키마
export const CreateBoardRequestSchema = BoardsSchema.extend({}); // BoardsSchema.extend({}) : BoardsSchema를 확장 (extend)하는 방식으로 공통된 부분을 재사용
// 게시글 등록 응답 스키마
export const CreateBoardResponseSchema = z.object({ name: z.string() });
// 게시글 등록 요청 타입
export type CreateBoardRequest = z.infer<typeof CreateBoardRequestSchema>;
// 게시글 등록 응답 타입
export type CreateBoardResponse = z.infer<typeof CreateBoardResponseSchema>;

/**
 * 게시글 조회
 */
// 게시글 조회 요청 스키마
export const FetchBoardRequestSchema = z.object({ boardId: z.string() });
// 게시글 조회 응답 스키마
export const FetchBoardResponseSchema = BoardsSchema.extend({});
// 게시글 조회 응답 타입
export type FetchBoardResponse = z.infer<typeof FetchBoardResponseSchema>;

/**
 * 게시글 업데이트
 */
// 게시글 업데이트 요청 스키마
export const UpdateBoardRequestSchema = z.object({
  title: z.string(),
  contents: z.string(),
  writer: z.string(),
  password: z.string(),
});

// 게시글 업데이트 요청 타입
export type UpdateBoardRequest = z.infer<typeof UpdateBoardRequestSchema>;

/**
 * 게시글 삭제
 */
// 게시글 삭제 요청 스키마
export const DeleteBoardRequestSchema = z.object({
  boardId: z.string(),
});