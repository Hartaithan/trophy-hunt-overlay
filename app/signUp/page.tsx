import type { FC } from "react";
import { Anchor, Container, Group, Title } from "@mantine/core";
import Link from "next/link";

const SignUpPage: FC = () => {
  return (
    <Container w="100%">
      <Title>SignUpPage</Title>
      <Group>
        <Anchor component={Link} href="/">
          Home
        </Anchor>
        <Anchor component={Link} href="/signIn">
          SignIn
        </Anchor>
      </Group>
    </Container>
  );
};

export default SignUpPage;
