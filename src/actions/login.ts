"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

const loginSchema = z.object({
  email: z.email(),
});

const getUserId = async () => {
  const userId = (await auth.api.getSession({ headers: await headers() }))?.user
    ?.id;

  if (!userId) {
    redirect("/auth");
  }

  return userId;
};

const loginAction = async (_initialData: unknown, formData: FormData) => {
  const email = formData.get("email");
  const validatedData = loginSchema.safeParse({ email });

  if (!validatedData.success) {
    return {
      errors: validatedData.error.message,
      success: false,
    };
  }

  const { status } = await auth.api.signInMagicLink({
    body: {
      email: validatedData.data.email,
      callbackURL: "/",
    },
    method: "POST",
    headers: await headers(),
  });

  if (!status) {
    return {
      errors: "Failed to send magic link",
      success: false,
    };
  }

  return {
    errors: null,
    success: status,
  };
};

export { loginAction, getUserId };
