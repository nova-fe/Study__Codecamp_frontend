const 게시글등록페이지 = () => {
  return (
    <div className="container max-w-screen-xl mx-auto py-10">
      <div className="font-bold text-xl mb-10">게시물 등록</div>
      <div className="">
        {/* 작성자, 비밀번호 */}
        <div className="flex gap-10 pb-10 border-b border-b-gray-300">
          <div className="flex flex-col basis-1/2">
            <label className="label-text mb-2">
              작성자<span className="text-red-500"> *</span>
            </label>
            <input
              className="input-primary"
              placeholder="작성자 명을 입력해 주세요."
            />
          </div>
          <div className="flex flex-col basis-1/2">
            <label className="label-text mb-2">
              비밀번호<span className="text-red-500"> *</span>
            </label>
            <input
              className="input-primary"
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
        </div>

        {/* 제목 */}
        <div className="py-10 border-b border-b-gray-300">
          <div className="flex flex-col basis-full">
            <label className="label-text mb-2">
              제목<span className="text-red-500"> *</span>
            </label>
            <input
              className="input-primary"
              placeholder="제목을 입력해 주세요."
            />
          </div>
        </div>

        {/* 내용 */}
        <div className="py-10 border-b border-b-gray-300">
          <div className="flex flex-col basis-full">
            <label className="label-text mb-2">
              내용<span className="text-red-500"> *</span>
            </label>
            <textarea
              className="input-primary h-[22rem] resize-none"
              placeholder="제목을 입력해 주세요."
            ></textarea>
          </div>
        </div>

        {/* 주소 */}
        <div className="py-10 border-b border-b-gray-300">
          <div className="flex flex-col basis-full">
            <label className="label-text mb-2">주소</label>
            <div className="flex mb-2">
              <input className="w-20 input-primary mr-2" placeholder="01234" />
              <button className="border border-black font-bold text-lg py-3 px-4 rounded-lg">
                우편번호 검색
              </button>
            </div>
            <input
              className="input-primary mb-2"
              placeholder="주소를 입력해 주세요."
            />
            <input className="input-primary" placeholder="상세주소" />
          </div>
        </div>

        {/* 유튜브 링크 */}
        <div className="py-10 border-b border-b-gray-300">
          <div className="flex flex-col basis-full">
            <label className="label-text mb-2">유튜브 링크</label>
            <input
              className="input-primary"
              placeholder="제목을 입력해 주세요."
            />
          </div>
        </div>

        {/* 사진 첨부 */}
        <div className="pt-10">
          <div className="flex flex-col">
            <label className="label-text mb-2">사진 첨부</label>
            <div className="flex gap-4">
              <button className="rounded-lg size-40 bg-gray-100 text-gray-600">
                클릭해서 사진 업로드
              </button>
              <button className="rounded-lg size-40 bg-gray-100 text-gray-600">
                클릭해서 사진 업로드
              </button>
              <button className="rounded-lg size-40 bg-gray-100 text-gray-600">
                클릭해서 사진 업로드
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
