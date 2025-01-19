// 댓글 관련 스키마
import { z } from 'zod';

// 댓글 데이터 스키마
export const CommentSchema = z.object({
  commentId: z.string(),
  writer: z.string(),
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
export type CreateCommentRequest = z.infer<typeof CreateCommentRequestSchema>
