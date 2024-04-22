
import Header from './Header/Header';
import HeaderMobile from './Header/Header-mobile';
import MarginWidthWrapper from './Header/margin-width-wrapper';
import PageWrapper from './Header/page-wraper';
import SideNav from './Header/side-nav';
import { SIDENAV_ITEMS } from './Header/constants';
import useAuth from '@/hooks/useAuth';

const RootLayout = ({ children }:any) => {

const auth = useAuth()


  return (

      <main className="bg-white font-inter">
        <div className="flex">
          <SideNav SIDENAV_ITEMS={SIDENAV_ITEMS} />
          <main className="flex-1">
            <MarginWidthWrapper>
              <Header />
              <HeaderMobile items={SIDENAV_ITEMS}/>
              <PageWrapper>{children}</PageWrapper>
            </MarginWidthWrapper>
          </main>
        </div>
      </main>
 
  );
};

export default RootLayout;
