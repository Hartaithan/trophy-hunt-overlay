import type { FC } from "react";
import { Anchor, Group, Title } from "@mantine/core";
import Link from "next/link";

const SignInPage: FC = () => {
  return (
    <>
      <Title>SignInPage</Title>
      <Group>
        <Anchor component={Link} href="/">
          Home
        </Anchor>
        <Anchor component={Link} href="/signUp">
          SignUp
        </Anchor>
      </Group>
    </>
  );
};

export default SignInPage;
