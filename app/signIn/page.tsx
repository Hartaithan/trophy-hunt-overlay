import type { FC } from "react";
import { Anchor, Container, Group, Title } from "@mantine/core";
import Link from "next/link";

const SignInPage: FC = () => {
  return (
    <Container w="100%">
      <Title>SignInPage</Title>
      <Group>
        <Anchor component={Link} href="/">
          Home
        </Anchor>
        <Anchor component={Link} href="/signUp">
          SignUp
        </Anchor>
      </Group>
    </Container>
  );
};

export default SignInPage;
