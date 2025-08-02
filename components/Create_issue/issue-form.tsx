'use client';

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
import { uploadToCloudinary } from "@/lib/cloudinaryUpload";
import ReportCreateMap from "../Map/ReportCreateMap";

export interface IssueFormProps {
  selectedFiles: File[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  isAnonymous: boolean;
  setIsAnonymous: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    locality: string;
    postalCode: string;
  } | null;
}

export function IssueForm({
  selectedFiles,
  onFileUpload,
  onRemoveFile,
  isAnonymous,
  setIsAnonymous,
  userId,
}: IssueFormProps) {
  const [category, setCategory] = useState<Category>();
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!category) {
      alert('Please select a category.');
      return;
    }

    try {
      setIsSubmitting(true);

      const photoUrls: string[] = [];

      for (const file of selectedFiles) {
        const url = await uploadToCloudinary(file);
        photoUrls.push(url);
      }

      // 🔴 Since location is removed, use dummy values or handle differently
      await createReport({
        title: categoryLabels[category],
        description,
        category,
        latitude: 0, // or null, depending on your schema
        longitude: 0,
        userId: isAnonymous ? undefined : userId,
        photoUrls,
      });

      console.log('✅ Report submitted successfully');
      alert('Issue reported successfully!');
    } catch (error) {
      console.error('❌ Error creating report:', error);
      alert('Failed to submit the issue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = !!category && description.trim().length > 0;

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

        <SubmitIssue
          onSubmit={handleSubmit}
          disabled={!isFormValid}
          loading={isSubmitting}
        />
      </CardContent>
    </Card>
  );
}
