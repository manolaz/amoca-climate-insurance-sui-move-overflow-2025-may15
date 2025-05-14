import PageLayout from "../components/PageLayout";
import WorldmapSelector from "../components/WorldmapSelector";

export default function RiskMapPage() {
  return (
    <PageLayout 
      title="Risk Assessment & Insurance Selection"
      subtitle="Select regions on the map to assess climate risks and get insurance quotes"
    >
      <WorldmapSelector />
    </PageLayout>
  );
}
