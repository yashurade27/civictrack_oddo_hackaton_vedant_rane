"use client";

import { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";

export function FilterBar() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full p-4 bg-white mb-6">
      {/* Filter Toggle Button for small screens */}
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

      {/* Filter options - responsive visibility */}
      <div
        className={`flex flex-wrap items-center gap-4 transition-all duration-300
          ${showFilters ? "block" : "hidden"} sm:flex`}
      >
        <Select>
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

        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="REPORTED">Reported</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="RESOLVED">Resolved</SelectItem>
          </SelectContent>
        </Select>

        {/* Distance filter with commented out options */}
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Distance" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="1">1 km</SelectItem>
            <SelectItem value="3">3 km</SelectItem>
            <SelectItem value="5">5 km</SelectItem> */}
          </SelectContent>
        </Select>

        <Input placeholder="Search issues..." className="w-64" />
      </div>
    </div>
  );
}

