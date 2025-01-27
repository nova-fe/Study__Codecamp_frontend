// 게시판 관련 스키마
import { z } from 'zod';

export const PostSchema = z.object({
  contents: z.string(),
  title: z.string(),
  writer: z.string(),
});

export type Post = z.infer<typeof PostSchema>;
