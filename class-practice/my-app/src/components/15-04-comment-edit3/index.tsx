import { useState } from "react"

export default function CommentItem({el}) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true);
  }

  return (
    <div>
      {!isEdit ? (
        <div>
          <span style={{ margin: '10px' }}>{el?.writer}</span>
          <span style={{ margin: '10px' }}>{el?.title}</span>
          <button onClick={onClickEdit}>수정</button>
        </div>
      ) : (
        <input type='text' key={el.id} />
      )}
    </div>
  )
};
