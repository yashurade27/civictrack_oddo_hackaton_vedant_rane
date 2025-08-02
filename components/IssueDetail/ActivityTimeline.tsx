// components/IssueDetail/ActivityTimeline.tsx
"use client";

interface ActivityTimelineProps {
  activity: string[];
}

export function ActivityTimeline({ activity }: ActivityTimelineProps) {
  return (
    <div>
      <h4 className="font-semibold mb-1">Activity</h4>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {activity.map((entry, idx) => (
          <li key={idx}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}
