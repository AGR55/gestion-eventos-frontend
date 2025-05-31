import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth?.token;

    // Rutas que requieren ser organizador
    if (pathname.startsWith("/organizer")) {
      // Verificar si el usuario es organizador
      if (!token?.isOrganizer) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    }

    // Rutas que requieren autenticación básica
    if (pathname.startsWith("/profile")) {
      if (!token) {
        return NextResponse.redirect(new URL("/auth", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Permitir acceso a rutas públicas
        if (
          !pathname.startsWith("/organizer") &&
          !pathname.startsWith("/profile")
        ) {
          return true;
        }

        // Requerir token para rutas protegidas
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/organizer/:path*",
    "/profile/:path*",
    "/events/create",
    "/events/edit/:path*",
  ],
};
