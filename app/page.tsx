import { IssueCard } from "@/components/Home_Screen/IssueCard";
import { FilterBar } from "@/components/Home_Screen/FilterBar";
import { Navbar } from "@/components/Home_Screen/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <FilterBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <IssueCard
            imageUrl="/images/streetlight.jpg"
            title="Streetlight not working"
            description="Street light not working since last 2 days"
            category="Lighting"
            status="In Progress"
            date="Aug 14"
            location="Gota Bridge, Ahmedabad"
            distance="2.8"
          />
          {/* Repeat more cards... */}
        </div>
      </main>
    </>
  );
}
