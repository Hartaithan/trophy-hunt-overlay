import type { FC } from "react";
import { Anchor, Group, Title } from "@mantine/core";
import Link from "next/link";

const HomePage: FC = () => {
  return (
    <>
      <Title>Hello World!</Title>
      <Group>
        <Anchor component={Link} href="/signUp">
          SignUp
        </Anchor>
        <Anchor component={Link} href="/signIn">
          SignIn
        </Anchor>
      </Group>
    </>
  );
};

export default HomePage;
