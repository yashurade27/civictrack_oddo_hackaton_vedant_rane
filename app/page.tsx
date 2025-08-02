// app/page.tsx
import Navbar from "@/components/Home_Screen/Navbar";
import { FilterBar } from "@/components/Home_Screen/FilterBar";
import IssueList from "@/components/Home_Screen/IssueList";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <FilterBar />
        <IssueList />
      </main>
    </>
  );
}
