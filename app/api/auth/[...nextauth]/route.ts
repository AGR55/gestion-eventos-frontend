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
          console.log("🔐 Attempting login with:", credentials.email);
          console.log("🌐 API URL:", process.env.NEXT_PUBLIC_API_URL);

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

          console.log("📡 Response status:", response.status);

          if (!response.ok) {
            console.error(
              "❌ Response not OK:",
              response.status,
              response.statusText
            );

            if (response.status === 401) {
              console.error("❌ Invalid credentials");
              return null;
            }

            const errorText = await response.text();
            console.error("❌ Error response:", errorText);

            try {
              const errorData = JSON.parse(errorText);
              if (errorData.code === "EmailNotVerified") {
                throw new Error("EMAIL_NOT_VERIFIED");
              }
            } catch (parseError) {
              // Si no se puede parsear como JSON, continuar con el flujo normal
            }

            return null;
          }

          const data = await response.json();
          console.log("✅ Login response data:", data);

          if (!data || typeof data !== "object") {
            console.error("❌ Invalid response format:", data);
            return null;
          }

          // ✨ Verificar que el token esté presente
          if (!data.token) {
            console.error("❌ No token in response:", data);
            return null;
          }

          console.log("✅ Token received, length:", data.token.length);
          console.log("✅ Token preview:", data.token.substring(0, 50) + "...");

          // ✨ Extraer datos del usuario de manera más robusta
          const userData = data.user || data;
          const userId = userData.id || data.id;
          const userEmail = userData.email || data.email || credentials.email;
          const userName =
            userData.userName ||
            userData.username ||
            data.username ||
            data.name ||
            userEmail.split("@")[0];

          if (!userId) {
            console.error("❌ Missing user ID in response. Data:", data);
            return null;
          }

          // ✨ Verificar rol de organizador de manera más robusta
          const isOrganizer =
            data.isOrganizer ||
            userData.isOrganizer ||
            (data.roles &&
              (data.roles.includes("Organizer") ||
                data.roles.includes("Admin") ||
                data.roles.includes("organizer") ||
                data.roles.includes("admin"))) ||
            false;

          const user = {
            id: String(userId),
            name: userName,
            email: userEmail,
            image: userData.profileImage || data.profileImage || null,
            token: data.token, // ✨ Asegurar que el token se pase
            isOrganizer: Boolean(isOrganizer),
            balance: userData.balance || data.balance || 0,
          };

          console.log("✅ Returning user object:", {
            ...user,
            token: user.token
              ? `${user.token.substring(0, 20)}...`
              : "NO TOKEN",
          });

          return user;
        } catch (error) {
          console.error("❌ Auth error:", error);
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
      console.log("🔑 JWT Callback - user:", user ? "present" : "null");
      console.log("🔑 JWT Callback - token keys:", Object.keys(token));

      if (user) {
        console.log("🔑 Setting token from user data");
        token.id = user.id;
        token.accessToken = user.token; // ✨ Crucial: asegurar que el token se guarde
        token.isOrganizer = user.isOrganizer;
        token.balance = user.balance;

        console.log("🔑 Token set - accessToken exists:", !!token.accessToken);
        console.log(
          "🔑 Token set - accessToken length:",
          token.accessToken?.length
        );
      }

      return token;
    },
    async session({ session, token }) {
      console.log("🎫 Session Callback - token keys:", Object.keys(token));
      console.log(
        "🎫 Session Callback - accessToken exists:",
        !!token.accessToken
      );

      if (session?.user && token) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string; // ✨ Crucial: pasar el token a la sesión
        session.user.isOrganizer = token.isOrganizer as boolean;
        session.user.balance = token.balance as number;

        console.log(
          "🎫 Session created - accessToken exists:",
          !!session.accessToken
        );
        console.log(
          "🎫 Session created - accessToken length:",
          session.accessToken?.length
        );
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  debug: process.env.NODE_ENV === "development", // ✨ Habilitar debug en desarrollo
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
