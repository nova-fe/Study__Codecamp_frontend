import { CreateCommentRequest } from '@/schemas';
import axios from 'axios';

const BASE_URL = 'https://nova-codecamp-board-default-rtdb.firebaseio.com';

// 댓글 등록
export const createComment = async (newData: CreateCommentRequest) => {
  const response = await axios.post(
    `${BASE_URL}/homework-comment.json`,
    newData,
  );
  console.log('댓글 등록 응답: ' + response.data);
  return response.data;
};
