"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">#{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "severity",
    header: "Severity",
    cell: ({ row }) => {
      const severity = row.getValue("severity") as string
      return (
        <Badge
          variant={
            severity === "critical"
              ? "destructive"
              : severity === "high"
                ? "default"
                : severity === "medium"
                  ? "outline"
                  : "secondary"
          }
        >
          {severity}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              status === "open"
                ? "bg-red-500"
                : status === "in-progress"
                  ? "bg-blue-500"
                  : status === "resolved"
                    ? "bg-green-500"
                    : "bg-gray-500"
            }`}
          />
          <span className="capitalize">{status.replace("-", " ")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const assignedTo = row.getValue("assignedTo") as string
      return assignedTo ? assignedTo : <span className="text-muted-foreground">Unassigned</span>
    },
  },
  {
    accessorKey: "dateReported",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date Reported
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("dateReported")}</div>,
  },
]

