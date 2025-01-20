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
// 댓글 목록 조회 응답 스키마
export const FetchCommentResponseSchema = z.record(CommentSchema);
// 댓글 목록 조회 응답 타입
export type FetchCommentResponse = z.infer<typeof FetchCommentResponseSchema>;
