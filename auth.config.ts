import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // create callback to verify if the request is authorized
    // called before the request is processed
    //    - receives arg with `auth` and `request` props
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    }
  },
  // list different login options
  providers: []
} satisfies NextAuthConfig;
