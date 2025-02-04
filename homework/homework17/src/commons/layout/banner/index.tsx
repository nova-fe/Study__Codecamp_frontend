// Import Swiper React components
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import styles from './styles.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function LayoutBannerList() {
  return (
    <>
      <Swiper
        className={styles.swiperPagination}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
      >
        <SwiperSlide>
          <Image
            src="/images/banner/banner_1.png"
            alt="배너이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: '516px',
              objectFit: 'cover', // 사진이 잘리지만 여백이 없음
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banner/banner_2.png"
            alt="배너이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: '516px',
              objectFit: 'cover', // 사진이 잘리지만 여백이 없음
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banner/banner_3.png"
            alt="배너이미지"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: '100%',
              height: '516px',
              objectFit: 'cover', // 사진이 잘리지만 여백이 없음
            }}
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
