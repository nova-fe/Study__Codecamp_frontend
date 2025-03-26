'use client';

import { usePathname } from 'next/navigation';
import LayoutBannerList from './banner';
import LayoutNavigation from './navigation';

// 배너 숨기고 싶은 페이지
const HIDDEN_BANNER = ['/boards/new', '/boards/[boardId]/edit'];

interface ILayout {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayout) {
  const pathName = usePathname();

  const isHiddenBanner =
    HIDDEN_BANNER.includes(pathName) ||
    // 수정 페이지(시작이 /boards/로 시작하고 끝이 /edit로 끝나는 페이지)
    (pathName.startsWith('/boards/') && pathName.endsWith('/edit'));
  return (
    <>
      <LayoutNavigation />
      {!isHiddenBanner && <LayoutBannerList />}
      {children}
    </>
  );
}
