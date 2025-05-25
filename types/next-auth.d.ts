import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      balance?: number;
      roles?: string[];
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    balance?: number;
    token?: string;
    roles?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    balance?: number;
    roles?: string[];
    exp?: number;
  }
}
