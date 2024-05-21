import type { FC } from "react";
import { Anchor, Group, Title } from "@mantine/core";
import Link from "next/link";
import PageContainer from "@/components/PageContainer/PageContainer";

const SignInPage: FC = () => {
  return (
    <PageContainer justify="center" align="center">
      <Title>SignInPage</Title>
      <Group>
        <Anchor component={Link} href="/">
          Home
        </Anchor>
        <Anchor component={Link} href="/signUp">
          SignUp
        </Anchor>
      </Group>
    </PageContainer>
  );
};

export default SignInPage;
