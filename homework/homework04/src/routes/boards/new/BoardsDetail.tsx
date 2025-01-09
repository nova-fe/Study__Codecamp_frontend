import profileIcon from '../../../assets/images/profile.png';
import linkIcon from '../../../assets/images/link.png';
import likeIcon from '../../../assets/images/like.png';
import unlikeIcon from '../../../assets/images/unlike.png';
import mapIcon from '../../../assets/images/map.png';
import menuIcon from '../../../assets/images/menu.png';
import pencilIcon from '../../../assets/images/pencil.png';
import dummyImage1 from '../../../assets/images/d1.png';
import dummyImage2 from '../../../assets/images/d2.png';

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
                  <img src={profileIcon} alt="link" />

                  <p className="text-gray-500  text-sm">홍길동</p>
                </div>
                <div className="text-gray-400 text-sm">2024.11.11</div>
              </div>
            </div>

            {/* 콘텐츠 */}
            <div className="pt-4 pb-10">
              <div className="flex justify-end gap-2 mb-6">
                <button>
                  <img src={linkIcon} alt="link" />
                </button>
                <button>
                  <img src={mapIcon} alt="map" />
                </button>
              </div>

              {/* 내용 */}
              <div className="text-black font-normal mb-6">
                <img className="mb-6" src={dummyImage2} alt="img" />
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
                <img src={dummyImage1} alt="img" />
              </div>

              {/* 좋아요 */}
              <div className="mt-6 flex justify-center gap-6">
                <button className="flex flex-col items-center  text-[#5F5F5F]">
                  <img src={unlikeIcon} alt="unlike" />
                  <span>24</span>
                </button>
                <button className="flex flex-col items-center text-[#F66A6A]">
                  <img src={likeIcon} alt="like" />
                  <span>12</span>
                </button>
              </div>
            </div>
          </article>

          <div className="flex justify-center gap-6">
            <button className="flex items-center btn-black btn-sm gap-3">
              <img src={menuIcon} alt="목록으로" />
              <span>목록으로</span>
            </button>
            <button className="flex items-center btn-black btn-sm gap-3">
              <img src={pencilIcon} alt="수정하기" />
              <span>수정하기</span>
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default BoardsDetail;
