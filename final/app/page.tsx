"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import {
  AlertCircle,
  Bell,
  Bug,
  CheckCircle,
  ChevronDown,
  Clock,
  Filter,
  LayoutDashboard,
  LogOut,
  Moon,
  MoreHorizontal,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BugDetailsModal } from "../bug-details-modal"
import { DataTable } from "../data-table"
import { columns } from "../columns"
import { bugs } from "../data"
import { BugDistributionChart } from "../bug-distribution-chart"
import { BugTrendsChart } from "../bug-trends-chart"
import { BugResolutionChart } from "../bug-resolution-chart"
import { Badge } from "@/components/ui/badge"
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

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [selectedBug, setSelectedBug] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userRole, setUserRole] = useState("developer") // developer, tester, manager

  // Count bugs by status
  const totalBugs = bugs.length
  const openBugs = bugs.filter((bug) => bug.status === "open").length
  const inProgressBugs = bugs.filter((bug) => bug.status === "in-progress").length
  const resolvedBugs = bugs.filter((bug) => bug.status === "resolved").length
  const closedBugs = bugs.filter((bug) => bug.status === "closed").length

  // Filter bugs based on user role
  const userBugs =
    userRole === "developer"
      ? bugs.filter((bug) => bug.assignedTo === "John Doe")
      : userRole === "tester"
        ? bugs.filter((bug) => bug.reportedBy === "Jane Smith")
        : bugs

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
                <SidebarMenuButton isActive>
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/my-bugs">
                    <Bug className="h-4 w-4" />
                    <span>My Bugs</span>
                  </a>
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
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Bug
                </Button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Bugs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalBugs}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Open Bugs</CardTitle>
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

            <Tabs defaultValue="all">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All Bugs</TabsTrigger>
                  <TabsTrigger value="my-bugs">
                    {userRole === "developer"
                      ? "Assigned to Me"
                      : userRole === "tester"
                        ? "Reported by Me"
                        : "Team Bugs"}
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="all" className="mt-4">
                <DataTable columns={columns} data={bugs} onRowClick={openBugDetails} />
              </TabsContent>
              <TabsContent value="my-bugs" className="mt-4">
                <DataTable columns={columns} data={userBugs} onRowClick={openBugDetails} />
              </TabsContent>
            </Tabs>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Bug Distribution</CardTitle>
                  <CardDescription>Distribution by severity</CardDescription>
                </CardHeader>
                <CardContent>
                  <BugDistributionChart />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Bug Trends</CardTitle>
                  <CardDescription>Bugs reported over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <BugTrendsChart />
                </CardContent>
              </Card>
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Resolution Rate</CardTitle>
                  <CardDescription>Bug resolution over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <BugResolutionChart />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions on bugs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} />
                          <AvatarFallback>{i % 2 === 0 ? "JD" : "JS"}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">
                            {i % 2 === 0 ? "John Doe" : "Jane Smith"}
                            <span className="text-muted-foreground">
                              {" "}
                              {i === 0
                                ? 'changed Bug #124 to "Resolved"'
                                : i === 1
                                  ? "commented on Bug #118"
                                  : i === 2
                                    ? "assigned Bug #115 to Alex Johnson"
                                    : i === 3
                                      ? "created Bug #132"
                                      : "reopened Bug #110"}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {i === 0
                              ? "2 minutes ago"
                              : i === 1
                                ? "1 hour ago"
                                : i === 2
                                  ? "3 hours ago"
                                  : i === 3
                                    ? "Yesterday at 4:30 PM"
                                    : "2 days ago"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>User-Specific View</CardTitle>
                    <CardDescription>
                      {userRole === "developer"
                        ? "Your assigned bugs"
                        : userRole === "tester"
                          ? "Bugs you reported"
                          : "Team overview"}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Refresh</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  {userRole === "developer" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium">Assigned to you</div>
                          <div className="text-2xl font-bold">
                            {bugs.filter((bug) => bug.assignedTo === "John Doe").length}
                          </div>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium">In progress</div>
                          <div className="text-2xl font-bold">
                            {bugs.filter((bug) => bug.assignedTo === "John Doe" && bug.status === "in-progress").length}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Your bugs by severity</div>
                        <div className="grid gap-2">
                          {["critical", "high", "medium", "low"].map((severity) => {
                            const count = bugs.filter(
                              (bug) => bug.assignedTo === "John Doe" && bug.severity === severity,
                            ).length
                            return (
                              <div key={severity} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-3 w-3 rounded-full ${
                                      severity === "critical"
                                        ? "bg-red-500"
                                        : severity === "high"
                                          ? "bg-orange-500"
                                          : severity === "medium"
                                            ? "bg-yellow-500"
                                            : "bg-green-500"
                                    }`}
                                  />
                                  <span className="text-sm capitalize">{severity}</span>
                                </div>
                                <span className="text-sm font-medium">{count}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {userRole === "tester" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium">Reported by you</div>
                          <div className="text-2xl font-bold">
                            {bugs.filter((bug) => bug.reportedBy === "Jane Smith").length}
                          </div>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium">Pending verification</div>
                          <div className="text-2xl font-bold">
                            {bugs.filter((bug) => bug.reportedBy === "Jane Smith" && bug.status === "resolved").length}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Status of your reported bugs</div>
                        <div className="grid gap-2">
                          {["open", "in-progress", "resolved", "closed"].map((status) => {
                            const count = bugs.filter(
                              (bug) => bug.reportedBy === "Jane Smith" && bug.status === status,
                            ).length
                            return (
                              <div key={status} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge
                                    variant={
                                      status === "open"
                                        ? "destructive"
                                        : status === "in-progress"
                                          ? "default"
                                          : status === "resolved"
                                            ? "outline"
                                            : "secondary"
                                    }
                                  >
                                    {status}
                                  </Badge>
                                </div>
                                <span className="text-sm font-medium">{count}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {userRole === "manager" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium">Unassigned bugs</div>
                          <div className="text-2xl font-bold">{bugs.filter((bug) => !bug.assignedTo).length}</div>
                        </div>
                        <div className="rounded-lg border p-3">
                          <div className="text-sm font-medium">Team efficiency</div>
                          <div className="text-2xl font-bold">78%</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Team workload</div>
                        <div className="grid gap-3">
                          {["John Doe", "Alex Johnson", "Sarah Williams"].map((dev, i) => {
                            const count = bugs.filter((bug) => bug.assignedTo === dev).length
                            return (
                              <div key={dev} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">{dev}</span>
                                  <span className="text-sm font-medium">{count} bugs</span>
                                </div>
                                <div className="h-2 rounded-full bg-muted">
                                  <div
                                    className="h-full rounded-full bg-primary"
                                    style={{ width: `${Math.min(count * 10, 100)}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>

      {selectedBug && <BugDetailsModal bug={selectedBug} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </SidebarProvider>
  )
}

