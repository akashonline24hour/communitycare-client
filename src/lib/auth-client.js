import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://communitycare-client.vercel.app"|| "http://localhost:3000",
  plugins: [jwtClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
