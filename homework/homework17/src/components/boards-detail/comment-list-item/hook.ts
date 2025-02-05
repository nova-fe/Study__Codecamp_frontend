import { useState } from 'react';

export const useCommentListItem = () => {
  const [isEdit, setIsEdit] = useState(false);

  // 댓글 업데이트(수정)
  const onClickUpdate = () => {
    setIsEdit(true);
  };
};
