"use client";

import { useState } from "react";
import { IssueCard } from "./IssueCard";
import { FilterBar } from "./FilterBar";

interface Issue {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;
}

interface Props {
  reports: Issue[];
}

export default function FilterableIssueList({ reports }: Props) {
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    search: "",
  });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filteredReports = reports.filter((issue) => {
    const matchCategory = !filters.category || issue.category === filters.category;
    const matchStatus = !filters.status || issue.status === filters.status;
    const matchSearch =
      !filters.search || issue.title.toLowerCase().includes(filters.search.toLowerCase());

    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <div>
      {/* ✅ Pass the handler here */}
      <FilterBar onFilterChange={handleFilterChange} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {filteredReports.length === 0 ? (
          <p className="text-center col-span-full">No issues match the filters.</p>
        ) : (
          filteredReports.map((issue) => (
            <IssueCard
              key={issue.id}
              {...issue}
              status={issue.status as "Reported" | "In Progress" | "Resolved"}
            />
          ))
        )}
      </div>
    </div>
  );
}
