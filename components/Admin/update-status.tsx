'use client'

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Calendar } from 'lucide-react'

import { getAllReports, updateReportStatus } from '@/app/server-actions/reportActions'

const statusOptions = [
  { value: 'REPORTED', label: 'Reported', color: 'destructive' },
  { value: 'IN_PROGRESS', label: 'In Progress', color: 'default' },
  { value: 'RESOLVED', label: 'Resolved', color: 'secondary' },
  { value: 'CLOSED', label: 'Closed', color: 'outline' },
]

const categoryColors = {
  ROADS: 'bg-blue-100 text-blue-800',
  LIGHTING: 'bg-yellow-100 text-yellow-800',
  WATER_SUPPLY: 'bg-cyan-100 text-cyan-800',
  CLEANLINESS: 'bg-green-100 text-green-800',
  PUBLIC_SAFETY: 'bg-red-100 text-red-800',
  OBSTRUCTIONS: 'bg-purple-100 text-purple-800',
}

export function UpdateStatus() {
  const [reports, setReports] = React.useState<any[]>([])

  React.useEffect(() => {
    const fetchReports = async () => {
      const data = await getAllReports()
      setReports(data)
    }
    fetchReports()
  }, [])

  const handleStatusChange = async (reportId: string, newStatus: string) => {
    const updated = await updateReportStatus(reportId, newStatus)
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: updated.status } : r))
    )
  }

  const getStatusBadgeVariant = (status: string) => {
    const option = statusOptions.find((s) => s.value === status)
    return (option?.color as any) || 'outline'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Report Status</CardTitle>
        <CardDescription>Manage and update the status of citizen reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium max-w-[200px]">
                  <div className="truncate">{report.title}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={categoryColors[report.category as keyof typeof categoryColors]}
                    variant="outline"
                  >
                    {report.category.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(report.status)}>
                    {report.status.replace('_', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[150px]">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{report.address}</span>
                  </div>
                </TableCell>
                <TableCell>{report.user?.name ?? 'Unknown'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(report.createdAt).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={report.status}
                    onValueChange={(value) => handleStatusChange(report.id, value)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
