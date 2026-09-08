import ComparisonTable from "../components/ComparisonTable";

export const metadata = {
  title: "Why SpaceY | SpaceY",
  description: "See how the SpaceY vacation experience compares."
};

export default function WhySpaceYPage() {
  return (
    <main className="min-h-screen pb-12 pt-4">
      <ComparisonTable />
    </main>
  );
}
