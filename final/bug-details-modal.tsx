"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Clock, MessageSquare, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BugDetailsModal({ bug, isOpen, onClose }) {
  const [status, setStatus] = useState(bug.status)
  const [comment, setComment] = useState("")

  const handleStatusChange = (value) => {
    setStatus(value)
    // In a real app, you would update the bug status in the database
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      // In a real app, you would add the comment to the database
      setComment("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              Bug #{bug.id}: {bug.title}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                bug.severity === "critical"
                  ? "destructive"
                  : bug.severity === "high"
                    ? "default"
                    : bug.severity === "medium"
                      ? "outline"
                      : "secondary"
              }
            >
              {bug.severity}
            </Badge>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Reported on {bug.dateReported}</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium">Description</h3>
                  <p className="mt-1 text-sm">{bug.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Reported By</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{bug.reportedBy}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Assigned To</h3>
                    <div className="mt-1 flex items-center gap-2">
                      {bug.assignedTo ? (
                        <>
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" />
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{bug.assignedTo}</span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">Unassigned</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Steps to Reproduce</h3>
                    <ol className="mt-1 list-decimal pl-4 text-sm">
                      <li>Navigate to the login page</li>
                      <li>Enter invalid credentials</li>
                      <li>Click the login button</li>
                      <li>Observe the error message</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Attachments</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
                  <div className="relative aspect-video rounded-lg border bg-muted">
                    <img
                      src="/placeholder.svg?height=100&width=200"
                      alt="Screenshot"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="relative aspect-video rounded-lg border bg-muted">
                    <img
                      src="/placeholder.svg?height=100&width=200"
                      alt="Screenshot"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-4 space-y-4">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Jane Smith</span>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm">
                      I've noticed this issue occurs only when using Chrome. Can anyone confirm?
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Alex Johnson</span>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                    <p className="text-sm">Confirmed. I can reproduce this in Chrome but not in Firefox.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">12 hours ago</span>
                    </div>
                    <p className="text-sm">I'll look into this. It might be related to a recent Chrome update.</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Comment
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 rounded-full p-1 ${
                        i === 0
                          ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                          : i === 1
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                            : i === 2
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400"
                              : i === 3
                                ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400"
                                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                      }`}
                    >
                      {i === 0 ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : i === 1 ? (
                        <Clock className="h-4 w-4" />
                      ) : i === 2 ? (
                        <AlertCircle className="h-4 w-4" />
                      ) : i === 3 ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                    </div>
                    <div className="grid gap-1">
                      <p className="text-sm">
                        {i === 0
                          ? 'John Doe changed status from "In Progress" to "Resolved"'
                          : i === 1
                            ? "Alex Johnson assigned this bug to John Doe"
                            : i === 2
                              ? 'Jane Smith changed severity from "Medium" to "High"'
                              : i === 3
                                ? "Alex Johnson added a comment"
                                : "Jane Smith created this bug"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {i === 0
                          ? "12 hours ago"
                          : i === 1
                            ? "1 day ago"
                            : i === 2
                              ? "1 day ago"
                              : i === 3
                                ? "1 day ago"
                                : "2 days ago"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

