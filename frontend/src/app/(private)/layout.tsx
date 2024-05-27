import Header from "@/components/Header/header";
import HeaderMobile from "@/components/Header/header-mobile";
import MarginWidthWrapper from "@/components/Header/margin-width-wrapper";
import PageWrapper from "@/components/Header/page-wraper";
import SideNav from "@/components/Header/side-nav";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex">
      <SideNav />
      <main className="flex-1">
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>{children}</PageWrapper>
        </MarginWidthWrapper>
      </main>
    </div>
  );
}
