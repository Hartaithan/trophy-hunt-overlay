import type { ActionResponse } from "@/models/action";
import type { SignInForm } from "@/models/auth";
import { auth } from "@/utils/firebase";
import type { UserCredential } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async (
  form: SignInForm,
): Promise<ActionResponse<UserCredential>> => {
  try {
    const response = await signInWithEmailAndPassword(
      auth,
      form.username + "@user.profile",
      form.password,
    );
    return {
      status: "success",
      message: "Successful sign in!",
      data: response,
    };
  } catch (error) {
    console.info("sign in error", error);
    return {
      status: "error",
      message: "Unable to sign in",
    };
  }
};
