import { getReports } from "@/app/server-actions/get-reports";
import FilterableIssueList from "./FilterableIssueList";

export default async function IssueListServer() {
  const reports = await getReports(); // could be admin or user-specific
  return <FilterableIssueList reports={reports} />;
}
