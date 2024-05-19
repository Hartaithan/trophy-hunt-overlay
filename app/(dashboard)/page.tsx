import type { FC } from "react";
import { Anchor, Container, Group, Title } from "@mantine/core";
import Link from "next/link";

const HomePage: FC = () => {
  return (
    <Container w="100%">
      <Title>Hello World!</Title>
      <Group>
        <Anchor component={Link} href="/signUp">
          SignUp
        </Anchor>
        <Anchor component={Link} href="/signIn">
          SignIn
        </Anchor>
      </Group>
    </Container>
  );
};

export default HomePage;
