// 게시판 관련 스키마
import { z } from 'zod';

// 게시글 데이터 스키마
export const BoardsSchema = z.object({
  writer: z.string(),
  title: z.string(),
  password: z.string(),
  contents: z.string().optional(),
  date: z.string().optional(),
  createdAt: z.number().optional(),
  youtubeUrl: z.string().optional(),
  address: z
    .object({
      zipcode: z.string().optional(),
      address: z.string().optional(),
      addressDetail: z.string().optional(),
    })
    .optional(), // 주소는 선택사항
});

/**
 * 게시글 목록 조회
 */
// 게시글 목록 조회 응답 스키마
export const FetchBoardsResponseSchema = z.record(z.string(), BoardsSchema);
// 게시글 목록 조회 응답 타입
export type FetchBoardsResponse = z.infer<typeof FetchBoardsResponseSchema>;

/**
 * 게시글 데이터의 key 목록 조회
 */
// key 목록 조회 응답 스키마
export const FetchAllKeysResponseSchema = z.array(z.string());
// key 목록 조회 응답 타입
export type FetchAllKeysResponse = z.infer<typeof FetchAllKeysResponseSchema>;

/**
 * 특정 시작 key와 limit에 따라 데이터 가져오기(페이징용 갯수 제한 데이터)
 */
// 특정 게시글 목록 조회 요청 스키마
export const FetchPostsByKeyRequestSchema = z.object({
  startKey: z.string(),
  limit: z.number(),
});
export type FetchPostsByKeyRequest = z.infer<
  typeof FetchPostsByKeyRequestSchema
>;

// 특정 게시글 목록 조회 응답 스키마
// BoardsSchema.shape -> BoardsSchema의 구조를 그대로 가져오는 방법
export const FetchPostsByKeyResponseSchema = z.array(
  z.object({ id: z.string(), ...BoardsSchema.shape }),
);
// 특정 게시글 목록 조회 응답 타입
export type FetchPostsByKeyResponse = z.infer<
  typeof FetchPostsByKeyResponseSchema
>;
