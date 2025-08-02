
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhotoUpload } from './photo-upload';
import { CategorySelect } from './category-select';
import { DescriptionField } from './description-field';
import { AnonymousCheckbox } from './anonymous-checkbox';
import { SubmitIssue } from './submit-issue';
import { Category, categoryLabels } from '@/types/category';
import { Bug } from 'lucide-react';
import { createReport } from '@/app/server-actions/createReport';
import { uploadToCloudinary } from '@/lib/cloudinaryUpload';
import ReportCreateMap from '../Map/ReportCreateMap';

interface IssueFormProps {
  selectedFiles: File[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  isAnonymous: boolean;
  setIsAnonymous: (value: boolean) => void;
  userId?: string;
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
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null); // ✅ Added
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const handleSubmit = async () => {
    if (!location || !category) {
      setLocationError(!location);
      alert('Please select both a category and a location.');
      return;
    }

    try {
      setIsSubmitting(true);
      setLocationError(false);

      // ✅ Upload each image to Cloudinary
      const photoUrls: string[] = [];

      for (const file of selectedFiles) {
        const url = await uploadToCloudinary(file);
        photoUrls.push(url);
      }

      // ✅ Submit to DB
      await createReport({
        title: categoryLabels[category],
        description,
        category,
        latitude: location.latitude,
        longitude: location.longitude,
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

        {/* 📍 Location Selector */}
        <ReportCreateMap onLocationChange={setLocation} />

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

