import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Users, CheckCircle, AlertCircle, BarChart3, Kanban, Target } from "lucide-react";
import { GanttChart } from "../components/gantt-chart";
import { KanbanBoard } from "../components/kanban-board";
import { MilestoneTable } from "../components/milestone-table";
import { ProjectStats } from "../components/project-stats";
import type { Project, Task, Milestone } from "@shared/schema";

export default function ProjectDashboard() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery<Task[]>({
    queryKey: ['/api/tasks', selectedProject],
    queryFn: () => fetch(`/api/tasks${selectedProject ? `?projectId=${selectedProject}` : ''}`).then(res => res.json()),
  });

  const { data: milestones = [], isLoading: milestonesLoading } = useQuery<Milestone[]>({
    queryKey: ['/api/milestones', selectedProject],
    queryFn: () => fetch(`/api/milestones${selectedProject ? `?projectId=${selectedProject}` : ''}`).then(res => res.json()),
  });

  const { data: stats } = useQuery<{
    totalProjects?: number;
    activeProjects?: number;
    totalTasks?: number;
    completedTasks?: number;
    totalAppointments?: number;
    totalDoctors?: number;
  }>({
    queryKey: ['/api/stats'],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'on-hold': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  if (projectsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Project Dashboard</h1>
            <p className="text-blue-600">Manage your projects with modern Gantt charts, Kanban boards, and milestone tracking</p>
          </div>
          <ProjectStats stats={stats} />
        </div>

        {/* Project Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Projects Overview
            </CardTitle>
            <CardDescription>Select a project to view detailed Gantt charts and task management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card 
                  key={project.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedProject === project.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <Badge variant={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-medium">{project.progress || 0}%</span>
                      </div>
                      <Progress value={project.progress || 0} className="h-2" />
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(project.startDate).toLocaleDateString()}</span>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard */}
        {selectedProject && (
          <Tabs defaultValue="gantt" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gantt" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Gantt Chart
              </TabsTrigger>
              <TabsTrigger value="kanban" className="flex items-center gap-2">
                <Kanban className="h-4 w-4" />
                Kanban Board
              </TabsTrigger>
              <TabsTrigger value="milestones" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Milestones
              </TabsTrigger>
            </TabsList>

            <TabsContent value="gantt" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Gantt Chart View</CardTitle>
                  <CardDescription>
                    Interactive timeline view with task dependencies and progress tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <GanttChart 
                    tasks={tasks} 
                    projectId={selectedProject}
                    isLoading={tasksLoading}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kanban" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Kanban Board</CardTitle>
                  <CardDescription>
                    Drag and drop task management with status columns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <KanbanBoard 
                    tasks={tasks} 
                    projectId={selectedProject}
                    isLoading={tasksLoading}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Project Milestones</CardTitle>
                  <CardDescription>
                    Track important project deliverables and deadlines
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MilestoneTable 
                    milestones={milestones} 
                    projectId={selectedProject}
                    isLoading={milestonesLoading}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Empty State */}
        {!selectedProject && (
          <Card className="text-center py-12">
            <CardContent>
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Select a Project to Get Started
              </h3>
              <p className="text-gray-500 mb-6">
                Choose a project above to view its Gantt chart, Kanban board, and milestones
              </p>
              <Button>
                Create New Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}