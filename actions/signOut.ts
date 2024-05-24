import type { ActionResponse } from "@/models/action";
import { auth } from "@/utils/firebase";
import type { UserCredential } from "firebase/auth";
import { signOut as firebaseSignOut } from "firebase/auth";

export const signOut = async (): Promise<ActionResponse<UserCredential>> => {
  try {
    await firebaseSignOut(auth);
    return {
      status: "success",
      message: "Successful sign out!",
    };
  } catch (error) {
    console.info("sign out error", error);
    return {
      status: "error",
      message: "Unable to sign out",
    };
  }
};
