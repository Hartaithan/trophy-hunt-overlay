"use client";

import type { FC } from "react";
import PageContainer from "@/components/PageContainer/PageContainer";
import { useAuth } from "@/providers/AuthProvider";
import { Text } from "@mantine/core";

const HomePage: FC = () => {
  const auth = useAuth();
  return (
    <PageContainer>
      HomePage
      <Text component="pre" size="xs">
        {JSON.stringify(auth, null, 2)}
      </Text>
    </PageContainer>
  );
};

export default HomePage;
