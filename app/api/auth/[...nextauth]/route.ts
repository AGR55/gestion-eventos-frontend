import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            if (data.code === "EmailNotVerified") {
              throw new Error("EMAIL_NOT_VERIFIED");
            }
            throw new Error(data.message || "Error de autenticación");
          }

          return {
            id: data.id || data.userId,
            name: data.username || data.name,
            email: data.email,
            image: data.profileImage,
            token: data.token,
            isOrganizer: data.isOrganizer || false, // Campo agregado
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.isOrganizer = user.isOrganizer; // Agregar isOrganizer al token
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.user.isOrganizer = token.isOrganizer as boolean; // Agregar al session
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isOrganizer?: boolean; // Nuevo campo
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    token?: string;
    isOrganizer?: boolean; // Nuevo campo
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    isOrganizer?: boolean; // Nuevo campo
  }
}
