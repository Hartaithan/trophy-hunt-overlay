import type { FC } from "react";
import SignInForm from "@/forms/SignInForm/SignInForm";
import PageContainer from "@/components/PageContainer/PageContainer";

const SignInPage: FC = () => {
  return (
    <PageContainer justify="center" align="center">
      <SignInForm />
    </PageContainer>
  );
};

export default SignInPage;
