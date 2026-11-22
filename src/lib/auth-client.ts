import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

// baseURL deya hoy nai, tai same-origin /api/auth e jay (next.config rewrite proxy kore)
export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false },
        plan: { type: "string", input: false }, // user pathay na, server free set kore
        phone: { type: "string", required: false },
        bio: { type: "string", required: false },
      },
    }),
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;

