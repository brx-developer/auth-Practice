import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";

const privateRoutes = ["/protected"];
const notAuthenticateRoutes = ["/login", "/register"];

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(
  ({ url, request, locals, redirect }, next) => {
    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;

    locals.isLoggedIn = isLoggedIn;

    if (user) {
      locals.user = {
        avatar: user.photoURL ?? "",
        email: user.email!,
        name: user.displayName!,
        emailVerified: user.emailVerified,
      };
    }

    if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
      return redirect("/");
    }

    if (isLoggedIn && notAuthenticateRoutes.includes(url.pathname)) {
      return redirect("/");
    }

    return next();
  }
);
