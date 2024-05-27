import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/ButtonLogout/ButtonLogout";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div>
      <span>`Olá, {session?.user.name}`</span>
    </div>
  );
}
