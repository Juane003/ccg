"use client";

import loginAction from "@/actions/login";
import SubmitButton from "../forms/SubmitButton";
import { Input } from "../ui/input";
import { useActionState } from "react";

const LoginForm = () => {
  const [state, formAction] = useActionState(loginAction, null);
  return (
    <form className="space-y-4" action={formAction}>
      <Input type="email" placeholder="Email" name="email" required />
      <SubmitButton className="w-full" variant="outline">
        Login
      </SubmitButton>
      {state?.errors && <p className="text-red-500">{state.errors}</p>}
    </form>
  );
};

export default LoginForm;
