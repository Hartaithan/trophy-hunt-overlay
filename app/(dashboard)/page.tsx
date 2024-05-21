import type { FC } from "react";
import { Anchor, Group, Title } from "@mantine/core";
import Link from "next/link";
import PageContainer from "@/components/PageContainer/PageContainer";

const HomePage: FC = () => {
  return (
    <PageContainer>
      <Title>Hello World!</Title>
      <Group>
        <Anchor component={Link} href="/signUp">
          SignUp
        </Anchor>
        <Anchor component={Link} href="/signIn">
          SignIn
        </Anchor>
      </Group>
    </PageContainer>
  );
};

export default HomePage;
