import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  return (
    <>
      <div className="container mx-auto max-w-screen-xl py-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Image
              className="h-[31px] w-[51px] mr-7"
              src="/images/logo.png"
              alt="로고"
              width={0}
              height={0}
              sizes="100vw"
            />
            <nav>
              <ul className="flex gap-4 items-center">
                <li className="p-2 shadow-[inset_0_-3px_0_0_#000000]">
                  <Link className="font-bold text-black" href="#">
                    트립토크
                  </Link>
                </li>
                <li className="p-2">
                  <Link className="font-medium text-gray-700" href="#">
                    숙박권 구매
                  </Link>
                </li>
                <li className="p-2">
                  <Link className="font-medium text-gray-700" href="#">
                    마이 페이지
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center">
            <Image
              className="h-auto w-10"
              src="/images/profile.png"
              alt="프로필"
              width={0}
              height={0}
              sizes="100vw"
            />

            <Image
              src="/images/down_arrow.png"
              className="w-6 h-6 ml-1"
              alt="프로필"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </>
  );
}
