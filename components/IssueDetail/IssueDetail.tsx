"use client";

import Image from "next/image";
import { MapPin, Clock, Tag, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UploadSection } from "./UploadSection";
import { ActivityTimeline } from "./ActivityTimeline";
import Navbar from "@/components/Home_Screen/Navbar";

const statusVariants = {
  Reported: "destructive",
  "In Progress": "default",
  Resolved: "secondary",
} as const;

interface IssueDetailProps {
  imageUrl: string;
  title: string;
  description: string;
  category: string;
  status: "Reported" | "In Progress" | "Resolved";
  location: string;
  activity: string[];
}

export function IssueDetail({
  imageUrl,
  title,
  description,
  category,
  status,
  location,
  activity,
}: IssueDetailProps) {
  const currentDate = new Date().toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-background to-muted/20 overflow-auto">
      {/* ✅ Navbar */}
      <Navbar />

      <div className="container mx-auto px-6 py-8 h-full">
        <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            {/* Image Section */}
            <div className="mb-8">
              <Card className="overflow-hidden shadow-lg">
                <div className="relative w-full h-80 lg:h-96">
                  <Image
                    src={imageUrl}
                    alt="Issue Image"
                    fill
                    className="object-contain"
                    style={{ objectPosition: "center" }}
                  />
                </div>
              </Card>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Category Section */}
                <div className="text-sm flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
                    <Tag className="w-5 h-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Category
                    </p>
                    <Badge variant="outline" className="font-semibold text-base">
                      {category}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Description Section */}
                <Card className="border-l">
                  <CardContent className="p-1">
                    <p className="text-base leading-relaxed text-black">
                      {description}
                    </p>
                  </CardContent>
                </Card>

                <Separator />

                {/* Reported Date */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-100 border border-orange-200 dark:bg-orange-900/20 dark:border-orange-800/30">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Reported on
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {currentDate}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Activity Timeline */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30">
                      <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-foreground">
                      Activity Timeline
                    </h2>
                  </div>
                  <div className="ml-14">
                    <ActivityTimeline activity={activity || []} />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 p-6 space-y-6">
                {/* Status */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Status
                  </p>
                  <Badge
                    variant={statusVariants[status]}
                    className="text-sm font-semibold px-4 py-2 shadow-sm"
                  >
                    {status}
                  </Badge>
                </div>

                <Separator />

                {/* Location */}
                <div className="space-y-3">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Location
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary/10 border border-primary/20">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground truncate">
                      {location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
