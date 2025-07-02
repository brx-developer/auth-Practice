import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { firebase } from "src/firebase/config";

export const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    remember_me: z.boolean().optional(),
  }),

  handler: async ({ email, password, remember_me }, { cookies }) => {
    // Cookies

    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // Un año
        path: "/",
      });
    } else {
      cookies.delete("email", {
        path: "/",
      });
    }

    try {
      // Iniciar Sesión
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      return JSON.stringify(user);
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("El correo ya está en uso");
      }

      throw new Error("Auxilio! algo salió mal");
    }
    return;
  },
});
