// 댓글 관련 스키마
import { z } from 'zod';

// 댓글 데이터 스키마
export const CommentSchema = z.object({
  writer: z.string(),
  password: z.string(),
  contents: z.string(),
  rating: z.number(),
  createdAt: z.string(),
});

/**
 * 댓글 등록 요청
 */
// 댓글 등록 요청 스키마
export const CreateCommentRequestSchema = CommentSchema.extend({});
// 댓글 등록 요청 타입
export type CreateCommentRequest = z.infer<typeof CreateCommentRequestSchema>;
// 댓글 등록 응답 스키마
export const CreateCommentResponseSchema = z.object({ name: z.string() });
// 댓글 등록 응답 타입
export type CreateCommentResponse = z.infer<typeof CreateCommentResponseSchema>;

/**
 * 댓글 목록 조회
 */
// 댓글 조회 응답 스키마
export const FetchCommentResponseSchema = CommentSchema.extend({});
// 댓글 조회 응답 타입
export type FetchCommentResponse = z.infer<typeof FetchCommentResponseSchema>;

/**
 * 댓글 조회
 */
// 댓글 조회 요청 스키마
export const FetchCommentRequestSchema = z.string();
// 댓글 조회 요청 타입
export type FetchCommentRequest = z.infer<typeof FetchCommentRequestSchema>;

/**
 * 특정 시작 key와 limit에 따라 댓글 가져오기
 */
// 특정 댓글 목록 조회 요청 스키마
export const FetchCommentByKeyRequestSchema = z.object({
  startKey: z.string(),
  limit: z.number(),
});
// 특정 댓글 목록 조회 요청 타입
export type FetchCommentByKeyRequest = z.infer<
  typeof FetchCommentByKeyRequestSchema
>;
// 특정 댓글 목록 조회 응답 스키마
export const FetchCommentByKeyResponseSchema = z.array(
  z.object({ commentId: z.string(), ...CommentSchema.shape }),
);
// 특정 댓글 목록 조회 응답 타입
export type FetchCommentByKeyResponse = z.infer<
  typeof FetchCommentByKeyResponseSchema
>;


/**
 * 댓글 수정(업데이트)
 */
// 댓글 수정(업데이트) 요청 스키마
export const UpdateCommentRequestSchema = z.object({
  commentId: z.string(),
  updateData: z.object({
    writer: z.string(),
    password: z.string(),
    contents: z.string(),
    rating: z.number(),
    createdAt: z.string(),
  }),
});
// 댓글 수정(업데이트) 요청 타입
export type UpdateCommentRequest = z.infer<typeof UpdateCommentRequestSchema>;
