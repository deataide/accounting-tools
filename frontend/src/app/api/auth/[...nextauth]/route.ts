import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface UserPayload {
  token: string;
  id: string | null;
  expiresAt: string;
  role: string;
  name: string;
}

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "joao@example.com",
        },
        password: { label: "Senha", type: "password", placeholder: "********" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch("http://localhost:3001/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            throw new Error("Falha na autorização");
          }

          const { payload }: { payload: UserPayload } = await res.json();

          if (payload) {
            return {
              id: "null",
              token: payload.token,
              name: payload.name,
              email: credentials?.email ?? "",
              role: payload.role,
              expiresAt: payload.expiresAt,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Erro durante a autorização:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.expires = session.user.expiresAt;
        session.user = token.user as any;
      }
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
