import type { Page } from "@/models/app";
import PageContainer from "@/components/PageContainer/PageContainer";
import OverlaySection from "@/sections/OverlaySection/OverlaySection";

interface Params {
  uid: string;
}

const OverlayPage: Page<Params> = (props) => {
  const { params } = props;
  return (
    <PageContainer>
      <OverlaySection userId={params.uid} />
    </PageContainer>
  );
};

export default OverlayPage;
