import type { FC } from "react";
import PageContainer from "@/components/PageContainer/PageContainer";
import GamesList from "@/sections/GamesList/GamesList";

const GamesPage: FC = () => {
  return (
    <PageContainer>
      <GamesList />
    </PageContainer>
  );
};

export default GamesPage;
