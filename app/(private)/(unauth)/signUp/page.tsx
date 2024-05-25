import type { FC } from "react";
import SignUpForm from "@/forms/SignUpForm/SignUpForm";
import PageContainer from "@/components/PageContainer/PageContainer";

const SignUpPage: FC = () => {
  return (
    <PageContainer justify="center" align="center">
      <SignUpForm />
    </PageContainer>
  );
};

export default SignUpPage;
