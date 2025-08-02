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

// 📷 Cloudinary upload helper
async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "your_upload_preset"); // <-- Change this
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data.secure_url;
}

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
  selectedFiles,
  onFileUpload,
  onRemoveFile,
  isAnonymous,
  setIsAnonymous,
  location,
  userId,
}: IssueFormProps) {
  const [category, setCategory] = useState<Category>();
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const handleSubmit = async () => {
    if (!location || !category) {
      setLocationError(!location);
      alert("Please select both a category and a location.");
      return;
    }

    try {
      setIsSubmitting(true);
      setLocationError(false);

      // Upload images to Cloudinary
      const photoUrls = (
        await Promise.all(
          selectedFiles.map(async (file) => {
            try {
              return await uploadToCloudinary(file);
            } catch (e) {
              console.error("Image upload failed for one file", e);
              return null;
            }
          })
        )
      ).filter((url): url is string => !!url);
      await createReport({
        title: categoryLabels[category],
        description,
        category,
        latitude: location.latitude,
        longitude: location.longitude,
        userId: isAnonymous ? undefined : userId,
        photoUrls,
      });

      console.log("✅ Report submitted successfully");
      alert("Issue reported successfully!");
    } catch (error) {
      console.error("❌ Error creating report:", error);
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
        <PhotoUpload
          selectedFiles={selectedFiles}
          onFileUpload={onFileUpload}
          onRemoveFile={onRemoveFile}
        />

        <CategorySelect value={category} onValueChange={setCategory} />

        <DescriptionField value={description} onChange={setDescription} />

        <AnonymousCheckbox
          checked={isAnonymous}
          onCheckedChange={setIsAnonymous}
        />

        {locationError && (
          <p className="text-red-500 text-sm -mt-2">
            📍 Please select a location on the map.
          </p>
        )}

        <SubmitIssue
          onSubmit={handleSubmit}
          disabled={!isFormValid}
          loading={isSubmitting}
        />
      </CardContent>
    </Card>
  );
}
