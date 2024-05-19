import type { FC } from "react";
import { Anchor, Group, Title } from "@mantine/core";
import Link from "next/link";

const SignUpPage: FC = () => {
  return (
    <>
      <Title>SignUpPage</Title>
      <Group>
        <Anchor component={Link} href="/">
          Home
        </Anchor>
        <Anchor component={Link} href="/signIn">
          SignIn
        </Anchor>
      </Group>
    </>
  );
};

export default SignUpPage;
