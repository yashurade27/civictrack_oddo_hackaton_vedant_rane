"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhotoUpload } from "./photo-upload";
import { CategorySelect } from "./category-select";
import { DescriptionField } from "./description-field";
import { AnonymousCheckbox } from "./anonymous-checkbox";
import { SubmitIssue } from "./submit-issue";
import { Category, categoryLabels } from "@/types/category";
import { Bug } from "lucide-react";
import { createReport } from "@/app/server-actions/createReport";

interface IssueFormProps {
  selectedFiles: File[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  isAnonymous: boolean;
  setIsAnonymous: (value: boolean) => void;
  location: { latitude: number; longitude: number } | null;
  userId?: string;
}

export function IssueForm({
  isAnonymous,
  setIsAnonymous,
  location,
  userId,
}: IssueFormProps) {
  const [category, setCategory] = useState<Category>();
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Add file state and handlers
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!location || !category) {
      alert("Please select both a category and a location.");
      return;
    }

    try {
      setIsSubmitting(true);

      await createReport({
        title: categoryLabels[category], // 🏷️ Use label as title
        description,
        category, // 👈 Pass enum directly
        latitude: location.latitude,
        longitude: location.longitude,
        userId: isAnonymous ? undefined : userId,
      });

      // UX: Reset form or redirect
      console.log("Report created successfully");
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Failed to submit the issue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = !!category && description.trim().length > 0 && location;

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bug className="w-5 h-5" />
          Report New Issue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 overflow-y-auto">
        {/* ✅ File upload component with handlers */}
        <PhotoUpload
          selectedFiles={selectedFiles}
          onFileUpload={handleFileUpload}
          onRemoveFile={handleRemoveFile}
        />

        <CategorySelect value={category} onValueChange={setCategory} />

        <DescriptionField value={description} onChange={setDescription} />

        <AnonymousCheckbox checked={isAnonymous} onCheckedChange={setIsAnonymous} />

        <SubmitIssue
          onSubmit={handleSubmit}
          disabled={!isFormValid}
          loading={isSubmitting}
        />
      </CardContent>
    </Card>
  );
}
