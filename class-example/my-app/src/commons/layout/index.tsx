'use client';

import { usePathname } from 'next/navigation';
import LayoutBanner from './banner';
import LayoutFooter from './footer';
import LayoutHeader from './header';
import LayoutNavigation from './navigation';

// 헤더 숨기고 싶은 페이지
const HIDDEN_HEADERS = [
  '/section12/12-01-library-icon',
  '/section12/12-03-library-star',
  // ...
];

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const pathName = usePathname();

  console.log('===========================');
  console.log('pathName: ' + pathName);
  console.log('===========================');

  const isHiddenHeader = HIDDEN_HEADERS.includes(pathName);

  return (
    <>
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <div className="h-30 flex">
        <div className="w-1/3 bg-red-100">사이드바</div>
        <div>{children}</div>
      </div>
      <LayoutFooter />
    </>
  );
}
