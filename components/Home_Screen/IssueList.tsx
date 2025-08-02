import { getReports } from "@/app/server-actions/get-reports";
import { IssueCard } from "@/components/Home_Screen/IssueCard";

export default async function IssueList() {
  const reports = await getReports();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {reports.map((issue) => (
        <IssueCard
          key={issue.id}
          {...issue}
          status={issue.status as "Reported" | "In Progress" | "Resolved"}
        />
      ))}
    </div>
  );
}
