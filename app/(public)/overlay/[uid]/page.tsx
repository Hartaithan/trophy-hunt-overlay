import type { Page } from "@/models/app";
import PageContainer from "@/components/PageContainer/PageContainer";

interface Params {
  uid: string;
}

const OverlayPage: Page<Params> = (props) => {
  const { params } = props;
  return <PageContainer>OverlayPage {params.uid}</PageContainer>;
};

export default OverlayPage;
