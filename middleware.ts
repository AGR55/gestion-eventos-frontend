import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Si la URL es /admin y el usuario no es administrador, redirigir
    const { pathname } = req.nextUrl;
    const userRole = req.nextauth?.token?.role;

    if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Especificar las rutas que requieren autenticación
export const config = {
  matcher: [
    "/profile/:path*",
    "/events/create",
    "/events/edit/:path*",
    "/admin/:path*",
  ],
};
