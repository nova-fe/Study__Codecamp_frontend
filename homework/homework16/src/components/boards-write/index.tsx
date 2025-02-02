import { useBoardsWrite } from './hook';
import { IBoardsWriteProps } from './types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Link from 'next/link';

export default function BoardsWrite(props: IBoardsWriteProps) {
  const {
    onChangeWriter,
    onChangePassword,
    onChangeContents,
    onChangeTitle,
    onChangeAddressDetail,
    onChangeYoutubeUrl,
    onClickPost,
    onClickUpdate,
    writerError,
    passwordError,
    titleError,
    contentsError,
    isActive,
    errMessage,
    boardId,
    prevData,
    alertMessage,
    isConfirm,
    onChangeCheckPassword,
    onClickCheckPasswordOpen,
    onClickAlertClose,
    isPasswordAlertOpen,
    toggleAlertOpen,
    isAddressAlertOpen,
    handleComplete,
    address,
  } = useBoardsWrite();
  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-10">
        <div className="mb-10 text-xl font-bold">
          게시물 {props.isEdit ? '수정' : '등록'}
        </div>
        <div className="">
          {/* 작성자, 비밀번호 */}
          <div className="flex gap-10 border-b border-b-gray-300 pb-10">
            <div className="flex basis-1/2 flex-col">
              <label className="label-text mb-2">
                작성자<span className="text-red-500"> *</span>
              </label>
              <input
                className="input-primary"
                placeholder="작성자 명을 입력해 주세요."
                onChange={onChangeWriter}
                value={prevData?.writer}
                disabled={props.isEdit ? true : false}
              />
              {writerError && (
                <div className="mt-2 text-red-500">{errMessage}</div>
              )}
            </div>
            <div className="flex basis-1/2 flex-col">
              <label className="label-text mb-2">
                비밀번호<span className="text-red-500"> *</span>
              </label>
              <input
                type="password"
                className="input-primary"
                placeholder="비밀번호를 입력해 주세요."
                onChange={onChangePassword}
                value={prevData?.password}
                disabled={props.isEdit ? true : false}
              />
              {passwordError && (
                <div className="mt-2 text-red-500">{errMessage}</div>
              )}
            </div>
          </div>

          {/* 제목 */}
          <div className="border-b border-b-gray-300 py-10">
            <div className="flex basis-full flex-col">
              <label className="label-text mb-2">
                제목<span className="text-red-500"> *</span>
              </label>
              <input
                className="input-primary"
                placeholder="제목을 입력해 주세요."
                onChange={onChangeTitle}
                value={prevData?.title}
              />
              {titleError && (
                <div className="mt-2 text-red-500">{errMessage}</div>
              )}
            </div>
          </div>

          {/* 내용 */}
          <div className="border-b border-b-gray-300 py-10">
            <div className="flex basis-full flex-col">
              <label className="label-text mb-2">
                내용<span className="text-red-500"> *</span>
              </label>
              <textarea
                className="input-primary h-[22rem] resize-none"
                placeholder="내용을 입력해 주세요."
                onChange={onChangeContents}
                value={prevData?.contents}
              ></textarea>
              {contentsError && (
                <div className="mt-2 text-red-500">{errMessage}</div>
              )}
            </div>
          </div>

          {/* 주소 */}
          <div className="border-b border-b-gray-300 py-10">
            <div className="flex basis-full flex-col">
              <label className="label-text mb-2">주소</label>
              <div className="mb-2 flex">
                <input
                  className="input-primary mr-2 w-24"
                  placeholder="우편번호"
                  value={address.zipcode || prevData?.address?.zipcode}
                  readOnly
                />
                <button
                  className="btn-black btn-md"
                  onClick={() => toggleAlertOpen('addressAlert')}
                >
                  우편번호 검색
                </button>
              </div>
              <input
                className="input-primary mb-2"
                placeholder="주소를 입력해 주세요."
                value={address.address || prevData?.address?.address}
                readOnly
              />
              <input
                onChange={onChangeAddressDetail}
                className="input-primary"
                placeholder="상세주소"
                value={prevData?.address?.addressDetail}
              />
            </div>
          </div>
          {/* 주소 얼럿 */}
          {isAddressAlertOpen && (
            <Dialog
              open={true}
              onClose={() => toggleAlertOpen('addressAlert')}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DaumPostcodeEmbed onComplete={handleComplete} {...props} />
              </DialogContent>
            </Dialog>
          )}

          {/* 유튜브 링크 */}
          <div className="border-b border-b-gray-300 py-10">
            <div className="flex basis-full flex-col">
              <label className="label-text mb-2">유튜브 링크</label>
              <input
                className="input-primary"
                placeholder="제목을 입력해 주세요."
                onChange={onChangeYoutubeUrl}
                value={prevData?.youtubeUrl}
              />
            </div>
          </div>

          {/* 사진 첨부 */}
          <div className="py-10">
            <div className="flex flex-col">
              <label className="label-text mb-2">사진 첨부</label>
              <div className="flex gap-4">
                <button className="bg-plus-icon size-40 rounded-lg bg-gray-100 bg-[bottom_5rem_center] bg-no-repeat leading-[14rem] tracking-tighter text-gray-600">
                  클릭해서 사진 업로드
                </button>
                <button className="bg-plus-icon size-40 rounded-lg bg-gray-100 bg-[bottom_5rem_center] bg-no-repeat leading-[14rem] tracking-tighter text-gray-600">
                  클릭해서 사진 업로드
                </button>
                <button className="bg-plus-icon size-40 rounded-lg bg-gray-100 bg-[bottom_5rem_center] bg-no-repeat leading-[14rem] tracking-tighter text-gray-600">
                  클릭해서 사진 업로드
                </button>
              </div>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-4">
            <Link href={props.isEdit ? `/boards/${boardId}` : '/boards'}>
              <button className="btn-black btn-md">취소</button>
            </Link>
            <button
              className={`${isActive || props.isEdit ? 'btn-primary' : 'btn-gray'} btn-md`}
              onClick={props.isEdit ? onClickCheckPasswordOpen : onClickPost}
            >
              {props.isEdit ? '수정' : '등록'} 하기
            </button>
          </div>

          {/* 얼럿 */}
          {isPasswordAlertOpen && (
            <Dialog
              open={true}
              onClose={() => toggleAlertOpen('passwordAlert')}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {alertMessage}
                </DialogContentText>
                {isConfirm && (
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    type="password"
                    fullWidth
                    value=""
                    onChange={onChangeCheckPassword}
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={() => onClickAlertClose(null, 'customClose')}>
                  닫기
                </Button>
                {isConfirm && <Button onClick={onClickUpdate}>확인</Button>}
              </DialogActions>
            </Dialog>
          )}
        </div>
      </div>
    </>
  );
}
