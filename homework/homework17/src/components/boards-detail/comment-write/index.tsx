'use client';

import Image from 'next/image';
import { useCommentWrite } from './hook';
import { Rating } from '@mui/material';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import { ICommentWriteProps } from './types';

export default function CommentWrite({
  isEdit,
  setIsEdit,
  comment,
  formatDate,
}: ICommentWriteProps) {
  const {
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onClickPostComment,
    onChangeRating,
    commentData,
    isActive,
    writerError,
    passwordError,
    contentsError,
    alertMessage,
    alertMessageList,
    isAlertOpen,
    toggleAlertOpen,
    isConfirm,
    onChangeCheckCommentPassword,
    onClickCommentUpdate,
    isUpdateAlertOpen,
    isSuccessPassword
  } = useCommentWrite({ comment, isEdit, setIsEdit });

  return (
    <div className="mt-6 border-t border-t-gray-200 pt-10">
      {!isEdit && (
        <div className="flex items-center gap-[10px] pb-6">
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
      )}

      <div className="pb-6">
        <Rating
          name="customized-color"
          // 증가값
          precision={0.5}
          value={isEdit ? comment?.rating : commentData?.rating}
          classes={{
            iconFilled: 'text-yellow-300', // 채워진 아이콘에 색상 적용
            iconEmpty: 'text-gray-200', // 빈 아이콘에 색상 적용
          }}
          // 아이콘 변경
          icon={<StarRateRoundedIcon fontSize="inherit" />}
          emptyIcon={<StarRateRoundedIcon fontSize="inherit" />}
          onChange={(event, newValue) => {
            onChangeRating(newValue);
          }}
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
            value={isEdit ? comment?.writer : commentData?.writer}
            disabled={isEdit ? true : false}
          />
          {!isEdit && writerError && (
            <div className="mt-2 text-red-500">{alertMessageList.required}</div>
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
            onChange={isEdit ? onChangeCheckCommentPassword : onChangePassword}
            value={isEdit ? undefined : commentData?.password}
            defaultValue={isEdit ? '' : undefined}
          />
          {passwordError && (
            <div className="mt-2 text-red-500">{alertMessageList.required}</div>
          )}
        </div>
      </div>

      <div>
        <div className="input-primary flex h-36 flex-col">
          <textarea
            className="h-24 w-full resize-none"
            placeholder="댓글을 입력해 주세요."
            maxLength={100}
            onChange={onChangeContents}
            value={isEdit ? undefined : commentData?.contents}
            defaultValue={isEdit ? comment?.contents : undefined}
            // defaultValue={!isEdit ? commentData?.contents : comment?.contents || ''}
          />

          <div className="text-right font-medium text-gray-300">0/100</div>
        </div>

        {contentsError && (
          <div className="mt-2 text-red-500">{alertMessageList.required}</div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        {!isEdit ? (
          <button
            onClick={onClickPostComment}
            className={`${isActive ? 'btn-primary' : 'btn-gray'} btn-md`}
          >
            댓글 등록
          </button>
        ) : (
          <>
            <button
              className="btn-black-line btn-md mr-4"
              onClick={() => {
                setIsEdit?.(false);
              }}
            >
              취소
            </button>
            <button
              onClick={onClickCommentUpdate}
              className={`${isActive ? 'btn-primary' : 'btn-gray'} btn-md`}
            >
              수정 하기
            </button>
          </>
        )}

        {/* 댓글 등록 얼럿 */}
        {isAlertOpen && (
          <Dialog
            open={true}
            onClose={() => toggleAlertOpen('successAlert')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent sx={{ width: 300 }}>
              <DialogContentText id="alert-dialog-description">
                {alertMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                disableElevation
                onClick={() => toggleAlertOpen('successAlert')}
              >
                확인
              </Button>
            </DialogActions>
          </Dialog>
        )}

        {/* 댓글 수정 얼럿 */}
        {isUpdateAlertOpen && (
          <Dialog
            open={true}
            onClose={() => toggleAlertOpen('successUpdate')}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent sx={{ width: 300 }}>
              <DialogContentText id="alert-dialog-description">
                {alertMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                disableElevation
                onClick={() => {
                  toggleAlertOpen('successUpdate');
                }}
              >
                확인
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
}
