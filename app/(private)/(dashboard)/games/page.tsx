import type { FC } from "react";
import PageContainer from "@/components/PageContainer/PageContainer";
import GamesSection from "@/sections/GamesSection/GamesSection";

const GamesPage: FC = () => {
  return (
    <PageContainer>
      <GamesSection />
    </PageContainer>
  );
};

export default GamesPage;
