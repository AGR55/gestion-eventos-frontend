import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("MISSING_CREDENTIALS");
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/Auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "User-Agent": "EventHorizon-Frontend/1.0",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            console.error("Auth API Error:", data);

            // Manejar diferentes tipos de errores
            switch (data.code) {
              case "EmailNotVerified":
                throw new Error("EMAIL_NOT_VERIFIED");
              case "InvalidCredentials":
                throw new Error("INVALID_CREDENTIALS");
              case "AccountLocked":
                throw new Error("ACCOUNT_LOCKED");
              default:
                throw new Error(data.message || "AUTHENTICATION_FAILED");
            }
          }

          // Validar que tenemos los datos necesarios
          if (!data.user || !data.token) {
            throw new Error("INVALID_RESPONSE_FORMAT");
          }

          return {
            id: data.user.id,
            name: data.user.userName || data.user.name,
            email: data.user.email,
            image: data.profileImage || data.user.profileImage,
            balance: data.user.balance || 0,
            token: data.token,
            roles: data.roles || [],
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
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Primer login
      if (user && account) {
        return {
          ...token,
          accessToken: user.token,
          id: user.id,
          balance: user.balance,
          roles: user.roles,
        };
      }

      // Verificar si el token ha expirado
      if (token.exp && Date.now() < token.exp * 1000) {
        return token;
      }

      // TODO: Implementar refresh token si es necesario
      return token;
    },

    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.balance = token.balance as number;
        session.user.roles = token.roles as string[];
        session.accessToken = token.accessToken as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Permite redirecciones relativas
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Permite redirecciones al mismo origen
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log("User signed in:", {
        userId: user.id,
        provider: account?.provider,
      });
    },
    async signOut({ token }) {
      console.log("User signed out:", { userId: token?.id });
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
    updateAge: 24 * 60 * 60, // 24 horas
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
