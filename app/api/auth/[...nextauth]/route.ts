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
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          console.log("Attempting login with:", credentials.email);
          console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          console.log("Response status:", response.status);

          const data = await response.json();
          console.log("Response data:", data);

          if (!response.ok) {
            if (response.status === 401) {
              console.error("Invalid credentials");
              return null;
            }

            if (data.code === "EmailNotVerified") {
              throw new Error("EMAIL_NOT_VERIFIED");
            }

            const errorMessage =
              data.message || data.error || `HTTP ${response.status}`;
            console.error("Auth error:", errorMessage);
            return null;
          }

          if (!data || typeof data !== "object") {
            console.error("Invalid response format");
            return null;
          }

          const userData = data.user;
          const userId = userData?.id || data.id;
          const userEmail = userData?.email || data.email || credentials.email;
          const userName =
            userData?.userName ||
            userData?.username ||
            data.username ||
            data.name ||
            userEmail.split("@")[0];

          if (!userId) {
            console.error("Missing user ID in response. User data:", userData);
            return null;
          }

          const isOrganizer =
            data.roles &&
            (data.roles.includes("Organizer") ||
              data.roles.includes("Admin") ||
              data.roles.includes("organizer") ||
              data.roles.includes("admin"));

          const user = {
            id: String(userId),
            name: userName,
            email: userEmail,
            image: userData?.profileImage || data.profileImage || null,
            token: data.token,
            isOrganizer: Boolean(isOrganizer),
            balance: userData?.balance || 0, // ✨ Nuevo campo
          };

          console.log("Returning user:", user);
          return user;
        } catch (error) {
          console.error("Auth error:", error);
          if (error instanceof Error) {
            throw error;
          }
          return null;
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
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
        token.isOrganizer = user.isOrganizer;
        token.balance = user.balance; // ✨ Nuevo campo
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.user.isOrganizer = token.isOrganizer as boolean;
        session.user.balance = token.balance as number;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Permite redirecciones relativas o al mismo origen
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  debug: process.env.NODE_ENV === "development",
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
      isOrganizer?: boolean;
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    token?: string;
    isOrganizer?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    isOrganizer?: boolean;
  }
}
