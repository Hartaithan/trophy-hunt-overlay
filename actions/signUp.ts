import type { ActionResponse } from "@/models/action";
import type { SignUpForm } from "@/models/auth";
import { auth } from "@/utils/firebase";
import type { UserCredential } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const signUp = async (
  form: SignUpForm,
): Promise<ActionResponse<UserCredential>> => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      form.username + "@user.profile",
      form.password,
    );
    return {
      status: "success",
      message: "Successful sign up!",
      data: response,
    };
  } catch (error) {
    console.info("sign up error", error);
    return {
      status: "error",
      message: "Unable to sign up",
    };
  }
};
