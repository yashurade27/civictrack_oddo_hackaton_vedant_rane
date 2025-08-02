"use client";

import React, { useState } from "react";
import Navbar from "@/components/Home_Screen/Navbar";
import { IssueForm } from "@/components/Create_issue/issue-form";
import dynamic from "next/dynamic";

const ReportCreateMap = dynamic(() => import("@/components/Map/ReportCreateMap"), {
  ssr: false, // ✅ prevent SSR crash
});

export default function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Handle adding files
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  // Handle removing files
  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        <div className="h-64 md:h-auto md:flex-1 md:p-4">
          <ReportCreateMap
            onLocationChange={({ latitude, longitude }) => {
              setLocation({ latitude, longitude });
            }}
          />
        </div>
        <div className="flex-1 md:w-96 md:flex-none p-4">
          {!location && (
            <p className="text-red-500 text-sm mb-2">
              ⚠️ Please select a location on the map before submitting.
            </p>
          )}

          <div className="flex-1 md:w-96 md:flex-none p-4">
            <IssueForm
              selectedFiles={selectedFiles}
              onFileUpload={handleFileUpload}
              onRemoveFile={handleRemoveFile}
              isAnonymous={isAnonymous}
              setIsAnonymous={setIsAnonymous}
              location={location}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
