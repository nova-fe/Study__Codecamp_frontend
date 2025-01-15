'use client';

import Image from 'next/image';
import styles from './styles.module.css';

const BoardsDetail = () => {
  return (
    <>
      <div className="container max-w-screen-xl mx-auto py-10">
        <main>
          <article>
            {/* 상단 */}
            <div className="pb-4 border-b border-gray-300">
              <h2 className="text-black font-bold text-3xl mb-6">
                살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
              </h2>
              <div className="flex justify-between align-center">
                <div className="flex flex-row gap-1">
                  <Image
                    className="w-6 h-auto"
                    src="/images/profile.png"
                    alt="profile"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />

                  <p className="text-gray-500  text-sm">홍길동</p>
                </div>
                <div className="text-gray-400 text-sm">2024.11.11</div>
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className="pt-4 pb-10">
              <div className="flex justify-end gap-2 mb-6">
                <button>
                  <Image
                    className="w-6 h-auto"
                    src="/images/link.png"
                    alt="link"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </button>
                <button>
                  <Image
                    className="w-6 h-auto"
                    src="/images/map.png"
                    alt="map"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                </button>
              </div>

              {/* 내용 */}
              <div className="text-black font-normal mb-6">
                <Image
                  className="mb-6 w-[400px]"
                  src="/images/d2.png"
                  alt="img"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
                <p>
                  살겠노라 살겠노라. 청산에 살겠노라.
                  <br />
                  머루랑 다래를 먹고 청산에 살겠노라.
                  <br />
                  얄리얄리 얄랑셩 얄라리 얄라
                  <br />
                  <br />
                  우는구나 우는구나 새야. 자고 일어나 우는구나 새야.
                  <br />
                  너보다 시름 많은 나도 자고 일어나 우노라.
                  <br />
                  얄리얄리 얄라셩 얄라리 얄라
                  <br />
                  <br />
                  갈던 밭(사래) 갈던 밭 보았느냐. 물 아래(근처) 갈던 밭 보았느냐
                  <br />
                  이끼 묻은 쟁기를 가지고 물 아래 갈던 밭 보았느냐.
                  <br />
                  얄리얄리 얄라셩 얄라리 얄라
                  <br />
                  <br />
                  이럭저럭 하여 낮일랑 지내 왔건만
                  <br />
                  올 이도 갈 이도 없는 밤일랑 또 어찌 할 것인가.
                  <br />
                  얄리얄리 얄라셩 얄라리 얄라
                  <br />
                  <br />
                  어디다 던지는 돌인가 누구를 맞히려던 돌인가.
                  <br />
                  미워할 이도 사랑할 이도 없이 맞아서 우노라.
                  <br />
                  얄리얄리 얄라셩 얄라리 얄라
                  <br />
                  <br />
                  살겠노라 살겠노라. 바다에 살겠노라.
                  <br />
                  나문재, 굴, 조개를 먹고 바다에 살겠노라.
                  <br />
                  얄리얄리 얄라셩 얄라리 얄라
                  <br />
                  <br />
                  가다가 가다가 듣노라. 에정지(미상) 가다가 듣노라.
                  <br />
                  사슴(탈 쓴 광대)이 솟대에 올라서 해금을 켜는 것을 듣노라.
                  <br />
                  얄리얄리 얄라셩 얄라리 얄라
                  <br />
                  <br />
                  가다 보니 배불룩한 술독에 독한 술을 빚는구나.
                  <br />
                  조롱박꽃 모양 누룩이 매워 (나를) 붙잡으니 내 어찌 하리이까.[1]
                  <br />
                  얄리얄리 얄라셩 얄라리 얄라
                  <br />
                </p>
              </div>

              {/* 유튜브 */}
              <div className="flex justify-center bg-gray-100 mt-6 py-6">
                <Image
                  className="w-[822px]"
                  src="/images/d1.png"
                  alt="img"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>

              {/* 좋아요 */}
              <div className="mt-6 flex justify-center gap-6">
                <button className="flex flex-col items-center  text-[#5F5F5F]">
                  <Image
                    className="w-6 h-auto"
                    src="/images/unlike.png"
                    alt="unlike"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <span>24</span>
                </button>
                <button className="flex flex-col items-center text-[#F66A6A]">
                  <Image
                    className="w-6 h-auto"
                    src="/images/like.png"
                    alt="like"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <span>12</span>
                </button>
              </div>
            </div>
          </article>

          <div className="flex justify-center gap-6">
            <button className="flex items-center btn-black btn-sm gap-3">
              <Image
                className="w-[18px] h-auto"
                src="/images/menu.png"
                alt="목록으로"
                width={0}
                height={0}
                sizes="100vw"
              />
              <span>목록으로</span>
            </button>
            <button className="flex items-center btn-black btn-sm gap-3">
              <Image
                className="w-[18px] h-auto"
                src="/images/pencil.png"
                alt="수정하기"
                width={0}
                height={0}
                sizes="100vw"
              />
              <span>수정하기</span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default BoardsDetail;
