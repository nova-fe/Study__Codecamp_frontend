'use client';

import LayoutBanner from './banner';
import LayoutFooter from './footer';
import LayoutHeader from './header';
import LayoutNavigation from './navigation';

export default function Layout({ children }) {
  return (
    <>
      <LayoutHeader />
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
