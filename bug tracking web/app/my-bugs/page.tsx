"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import {
  AlertCircle,
  ArrowUpDown,
  Bell,
  Bug,
  CheckCircle,
  ChevronDown,
  Clock,
  Filter,
  LayoutDashboard,
  LogOut,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { BugDetailsModal } from "../../bug-details-modal"
import { DataTable } from "../../data-table"
import { columns } from "../../columns"
import { bugs } from "../../data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MyBugsPage() {
  const { theme, setTheme } = useTheme()
  const [selectedBug, setSelectedBug] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userRole, setUserRole] = useState("developer") // developer, tester, manager
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dateReported")
  const [sortOrder, setSortOrder] = useState("desc")

  // Get user-specific bugs based on role
  const userBugs =
    userRole === "developer"
      ? bugs.filter((bug) => bug.assignedTo === "John Doe")
      : userRole === "tester"
        ? bugs.filter((bug) => bug.reportedBy === "Jane Smith")
        : bugs

  // Apply status filter
  const filteredBugs = statusFilter === "all" ? userBugs : userBugs.filter((bug) => bug.status === statusFilter)

  // Apply sorting
  const sortedBugs = [...filteredBugs].sort((a, b) => {
    if (sortBy === "dateReported") {
      // Simple date string comparison (in a real app, use proper date objects)
      return sortOrder === "asc"
        ? a.dateReported.localeCompare(b.dateReported)
        : b.dateReported.localeCompare(a.dateReported)
    } else if (sortBy === "severity") {
      // Custom severity order: critical > high > medium > low
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      return sortOrder === "asc"
        ? severityOrder[a.severity] - severityOrder[b.severity]
        : severityOrder[b.severity] - severityOrder[a.severity]
    }
    return 0
  })

  // Count bugs by status
  const openBugs = userBugs.filter((bug) => bug.status === "open").length
  const inProgressBugs = userBugs.filter((bug) => bug.status === "in-progress").length
  const resolvedBugs = userBugs.filter((bug) => bug.status === "resolved").length
  const closedBugs = userBugs.filter((bug) => bug.status === "closed").length

  // Calculate completion percentage
  const totalUserBugs = userBugs.length
  const completedBugs = resolvedBugs + closedBugs
  const completionPercentage = totalUserBugs > 0 ? Math.round((completedBugs / totalUserBugs) * 100) : 0

  const openBugDetails = (bug) => {
    setSelectedBug(bug)
    setIsModalOpen(true)
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Bug className="h-6 w-6" />
              <span className="text-xl font-bold">BugTracker</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Bug className="h-4 w-4" />
                  <span>My Bugs</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Clock className="h-4 w-4" />
                  <span>Activity</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <span>John Doe</span>
                      <ChevronDown className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setUserRole("developer")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Developer View</span>
                      {userRole === "developer" && <CheckCircle className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setUserRole("tester")}>
                      <AlertCircle className="mr-2 h-4 w-4" />
                      <span>Tester View</span>
                      {userRole === "tester" && <CheckCircle className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setUserRole("manager")}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Manager View</span>
                      {userRole === "manager" && <CheckCircle className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex flex-1 items-center gap-4">
              <form className="flex-1 md:flex-initial">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search bugs..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
                  />
                </div>
              </form>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                        3
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="flex flex-col gap-2 p-2">
                      <div className="flex items-start gap-2 rounded-lg p-2 hover:bg-muted">
                        <Bug className="mt-0.5 h-5 w-5 text-primary" />
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">Bug #124 assigned to you</p>
                          <p className="text-xs text-muted-foreground">2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 rounded-lg p-2 hover:bg-muted">
                        <CheckCircle className="mt-0.5 h-5 w-5 text-green-500" />
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">Bug #118 marked as resolved</p>
                          <p className="text-xs text-muted-foreground">1 hour ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 rounded-lg p-2 hover:bg-muted">
                        <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-500" />
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">New comment on Bug #115</p>
                          <p className="text-xs text-muted-foreground">3 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </div>
          </header>

          <main className="grid gap-6 p-6 md:gap-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight">
                {userRole === "developer"
                  ? "My Assigned Bugs"
                  : userRole === "tester"
                    ? "Bugs I Reported"
                    : "Team Bugs"}
              </h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  {userRole === "tester" ? "Report Bug" : "New Bug"}
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Open</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{openBugs}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{inProgressBugs}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{resolvedBugs}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Closed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{closedBugs}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>
                  {userRole === "developer"
                    ? "Your bug resolution progress"
                    : userRole === "tester"
                      ? "Status of bugs you reported"
                      : "Team bug resolution progress"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Completion</span>
                    </div>
                    <span className="text-sm font-medium">{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />

                  <div className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4">
                    <div className="flex flex-col items-center gap-1 rounded-lg border p-3">
                      <span className="text-sm text-muted-foreground">Open</span>
                      <span className="text-xl font-bold">{openBugs}</span>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-red-500"
                          style={{ width: `${totalUserBugs > 0 ? (openBugs / totalUserBugs) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg border p-3">
                      <span className="text-sm text-muted-foreground">In Progress</span>
                      <span className="text-xl font-bold">{inProgressBugs}</span>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${totalUserBugs > 0 ? (inProgressBugs / totalUserBugs) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg border p-3">
                      <span className="text-sm text-muted-foreground">Resolved</span>
                      <span className="text-xl font-bold">{resolvedBugs}</span>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${totalUserBugs > 0 ? (resolvedBugs / totalUserBugs) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1 rounded-lg border p-3">
                      <span className="text-sm text-muted-foreground">Closed</span>
                      <span className="text-xl font-bold">{closedBugs}</span>
                      <div className="h-1.5 w-full rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-gray-500"
                          style={{ width: `${totalUserBugs > 0 ? (closedBugs / totalUserBugs) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div>
                  <CardTitle>My Bugs</CardTitle>
                  <CardDescription>
                    {userRole === "developer"
                      ? "Bugs assigned to you"
                      : userRole === "tester"
                        ? "Bugs you reported"
                        : "All team bugs"}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-auto">
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Sort by
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setSortBy("dateReported")
                          setSortOrder("desc")
                        }}
                      >
                        Newest first
                        {sortBy === "dateReported" && sortOrder === "desc" && <CheckCircle className="ml-2 h-4 w-4" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSortBy("dateReported")
                          setSortOrder("asc")
                        }}
                      >
                        Oldest first
                        {sortBy === "dateReported" && sortOrder === "asc" && <CheckCircle className="ml-2 h-4 w-4" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSortBy("severity")
                          setSortOrder("desc")
                        }}
                      >
                        Highest severity
                        {sortBy === "severity" && sortOrder === "desc" && <CheckCircle className="ml-2 h-4 w-4" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSortBy("severity")
                          setSortOrder("asc")
                        }}
                      >
                        Lowest severity
                        {sortBy === "severity" && sortOrder === "asc" && <CheckCircle className="ml-2 h-4 w-4" />}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <DataTable columns={columns} data={sortedBugs} onRowClick={openBugDetails} />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {selectedBug && <BugDetailsModal bug={selectedBug} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </SidebarProvider>
  )
}

