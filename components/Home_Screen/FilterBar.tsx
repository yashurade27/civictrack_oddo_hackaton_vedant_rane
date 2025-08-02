"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";

interface FilterBarProps {
  onFilterChange?: (filters: {
    category?: string;
    status?: string;
    search?: string;
  }) => void;
}

export function FilterBar({ onFilterChange = () => {} }: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    search: "",
  });

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // ✅ now safe even if undefined
  };

  return (
    <div className="w-full p-4 bg-white mb-6">
      {/* Toggle on mobile */}
      <div className="flex sm:hidden justify-end mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <Funnel className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div
        className={`flex flex-wrap items-center gap-4 transition-all duration-300 ${
          showFilters ? "block" : "hidden"
        } sm:flex`}
      >
        <Select onValueChange={(value) => handleChange("category", value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Road">Road</SelectItem>
            <SelectItem value="Lighting">Lighting</SelectItem>
            <SelectItem value="Water">Water</SelectItem>
            <SelectItem value="Cleanliness">Cleanliness</SelectItem>
            <SelectItem value="Safety">Safety</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => handleChange("status", value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Reported">Reported</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search issues..."
          className="w-64"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
        />
      </div>
    </div>
  );
}
