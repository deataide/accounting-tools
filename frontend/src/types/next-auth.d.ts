import NextAuth, { ISODateString } from "next-auth";

declare module "next-auth" {
  interface User {
    token: string;
    role: string;
    name: string;
    expiresAt: string;
  }

  interface Session {
    user: User;
  }
}
