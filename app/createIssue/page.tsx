"use client";

import React, { useState } from "react";
import Navbar from "@/components/Home_Screen/Navbar";
import { IssueForm } from "@/components/Create_issue/issue-form";
import dynamic from "next/dynamic";

// ✅ Dynamically load map to avoid SSR issues
const ReportCreateMap = dynamic(() => import("@/components/Map/ReportCreateMap"), {
  ssr: false,
});

export default function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
    locality: string;
    postalCode: string;
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row gap-4 p-4">
        {/* Map Section */}
        <div className="md:w-2/3 w-full h-64 md:h-auto">
          <ReportCreateMap
            onLocationChange={(data) => {
              setLocation(data);
            }}
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/3 w-full space-y-2">
          {!location && (
            <p className="text-red-500 text-sm mb-2">
              ⚠️ Please select a location on the map before submitting.
            </p>
          )}

          <IssueForm
            selectedFiles={selectedFiles}
            onFileUpload={handleFileUpload}
            onRemoveFile={handleRemoveFile}
            isAnonymous={isAnonymous}
            setIsAnonymous={setIsAnonymous}
            userId={undefined} // or pass actual userId
            location={location} // ✅ send full location object
          />
        </div>
      </div>
    </div>
  );
}
