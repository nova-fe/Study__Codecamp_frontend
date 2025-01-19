import Image from 'next/image';
import { useCommentWrite } from './hook';
import { writer } from 'repl';

export default function CommentWrite() {
  const {
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onClickPostComment,
    isActive,
    writerError,
    passwordError,
    errMessage,
  } = useCommentWrite();

  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-10 border-t border-t-gray-200">
        <div className="flex gap-[10px] items-center">
          <Image
            className="w-[20px] h-[18px]"
            src="/images/comment.png"
            alt="profile"
            width={0}
            height={0}
            sizes="100vw"
          />
          <span className="font-semibold">댓글</span>
        </div>
        <div className="py-6">별점 영역</div>
        <div className="flex gap-4 mb-4">
          <div className="flex flex-col">
            <label className="label-text mb-2">
              작성자<span className="text-red-500"> *</span>
            </label>
            <input
              className="input-primary w-80"
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeWriter}
            />
            {writerError && (
              <div className="mt-2 text-red-500">{errMessage}</div>
            )}
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
            />
            {passwordError && (
              <div className="mt-2 text-red-500">{errMessage}</div>
            )}
          </div>
        </div>
        <div className="input-primary h-36 flex flex-col">
          <textarea
            className=" resize-none w-full h-24"
            placeholder="댓글을 입력해 주세요."
            maxLength={100}
            onChange={onChangeContents}
          />
          <div className="font-medium text-gray-300 text-right">0/100</div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={onClickPostComment}
            className={`${isActive ? 'btn-primary' : 'btn-gray'} btn-md`}
          >
            댓글 등록
          </button>
        </div>
      </div>
    </>
  );
}
