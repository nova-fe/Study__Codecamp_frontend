'use client';

import Image from 'next/image';
import { useCommentWrite } from './hook';
import { Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

export default function CommentWrite() {
  const {
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onClickPostComment,
    commentData,
    isActive,
    writerError,
    passwordError,
    errMessage,
  } = useCommentWrite();

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#FADA67',
    },
  });

  const changeRating = e => {
    console.log(e.target.value);
  };

  return (
    <div className="mt-6 border-t border-t-gray-200 pt-10">
      <div className="flex items-center gap-[10px]">
        <Image
          className="h-[18px] w-[20px]"
          src="/images/comment.png"
          alt="profile"
          width={0}
          height={0}
          sizes="100vw"
        />
        <span className="font-semibold">댓글</span>
      </div>
      <div className="py-6">
        <StyledRating
          name="customized-color"
          // 기본값
          defaultValue={3}
          // 증가값
          precision={0.5}
          // 아이콘 변경
          icon={<StarRateRoundedIcon fontSize="inherit" />}
          emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
          onChange={changeRating}
        />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex flex-col">
          <label className="label-text mb-2">
            작성자<span className="text-red-500"> *</span>
          </label>
          <input
            className="input-primary w-80"
            type="text"
            placeholder="작성자 명을 입력해 주세요."
            onChange={onChangeWriter}
            value={commentData?.writer}
          />
          {writerError && <div className="mt-2 text-red-500">{errMessage}</div>}
        </div>
        <div className="flex flex-col">
          <label className="label-text mb-2">
            비밀번호<span className="text-red-500"> *</span>
          </label>
          <input
            className="input-primary w-80"
            type="password"
            placeholder="비밀번호를 입력해 주세요."
            onChange={onChangePassword}
            value={commentData?.password}
          />
          {passwordError && (
            <div className="mt-2 text-red-500">{errMessage}</div>
          )}
        </div>
      </div>
      <div className="input-primary flex h-36 flex-col">
        <textarea
          className="h-24 w-full resize-none"
          placeholder="댓글을 입력해 주세요."
          maxLength={100}
          onChange={onChangeContents}
          value={commentData?.contents}
        />
        <div className="text-right font-medium text-gray-300">0/100</div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onClickPostComment}
          className={`${isActive ? 'btn-primary' : 'btn-gray'} btn-md`}
        >
          댓글 등록
        </button>
      </div>
    </div>
  );
}
