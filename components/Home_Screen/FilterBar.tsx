"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function FilterBar() {
  return (
    <div className="w-full flex flex-wrap items-center gap-4 p-4 bg-white border rounded-lg shadow-sm mb-6">
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
          <SelectItem value="Reported">Reported</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Distance" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">1 km</SelectItem>
          <SelectItem value="3">3 km</SelectItem>
          <SelectItem value="5">5 km</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Search issues..."
        className="w-64"
      />
    </div>
  );
}
