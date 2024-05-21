import type { FC } from "react";
import { Anchor, Group, Title } from "@mantine/core";
import Link from "next/link";
import PageContainer from "@/components/PageContainer/PageContainer";

const SignUpPage: FC = () => {
  return (
    <PageContainer justify="center" align="center">
      <Title>SignUpPage</Title>
      <Group>
        <Anchor component={Link} href="/">
          Home
        </Anchor>
        <Anchor component={Link} href="/signIn">
          SignIn
        </Anchor>
      </Group>
    </PageContainer>
  );
};

export default SignUpPage;
