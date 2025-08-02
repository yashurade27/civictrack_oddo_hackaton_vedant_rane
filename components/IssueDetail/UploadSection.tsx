// components/IssueDetail/UploadSection.tsx
"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export function UploadSection() {
  const [fileName, setFileName] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // You can upload file to server or cloud here
    }
  };

  return (
    <div className="mt-2">
      <label className="text-sm font-medium block mb-1">Upload New Image</label>
      <Input type="file" accept="image/*" onChange={handleUpload} />
      {fileName && <p className="text-xs text-gray-500 mt-1">Selected: {fileName}</p>}
    </div>
  );
}
