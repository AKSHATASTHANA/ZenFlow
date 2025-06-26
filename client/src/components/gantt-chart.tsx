import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Download, Upload, Eye, Settings, Plus } from "lucide-react";
import { TaskDetailsModal } from "@/components/task-details-modal";
import { apiRequest } from "@/lib/queryClient";
import type { Task } from "@shared/schema";

interface GanttChartProps {
  tasks: Task[];
  projectId: number;
  isLoading: boolean;
}

interface GanttTask extends Task {
  x: number;
  width: number;
  y: number;
}

export function GanttChart({ tasks, projectId, isLoading }: GanttChartProps) {
  const [scale, setScale] = useState<'day' | 'month' | 'year'>('month');
  const [showFullColumns, setShowFullColumns] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Calculate date range
  const dates = tasks.map(task => [new Date(task.startDate), new Date(task.endDate)]).flat();
  const minDate = dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : new Date();
  const maxDate = dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : new Date();

  // Generate timeline based on scale
  const getTimelineData = () => {
    const timeline = [];
    const current = new Date(minDate);
    current.setDate(1); // Start from beginning of month

    while (current <= maxDate) {
      if (scale === 'day') {
        timeline.push(new Date(current));
        current.setDate(current.getDate() + 1);
      } else if (scale === 'month') {
        timeline.push(new Date(current));
        current.setMonth(current.getMonth() + 1);
      } else {
        timeline.push(new Date(current));
        current.setFullYear(current.getFullYear() + 1);
      }
    }
    return timeline;
  };

  const timeline = getTimelineData();
  const dayWidth = scale === 'day' ? 30 : scale === 'month' ? 120 : 300;

  // Calculate task positions
  const ganttTasks: GanttTask[] = tasks.map((task, index) => {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    const startDiff = startDate.getTime() - minDate.getTime();
    const duration = endDate.getTime() - startDate.getTime();
    
    return {
      ...task,
      x: (startDiff / (24 * 60 * 60 * 1000)) * (dayWidth / (scale === 'day' ? 1 : scale === 'month' ? 30 : 365)),
      width: Math.max((duration / (24 * 60 * 60 * 1000)) * (dayWidth / (scale === 'day' ? 1 : scale === 'month' ? 30 : 365)), 20),
      y: index * 40 + 10,
    };
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: { id: number; updates: Partial<Task> }) =>
      apiRequest(`/api/tasks/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data.updates),
        headers: { 'Content-Type': 'application/json' }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500';
      case 'high': return 'border-orange-500';
      case 'medium': return 'border-blue-500';
      case 'low': return 'border-gray-400';
      default: return 'border-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant={scale === 'day' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setScale('day')}
            >
              Day
            </Button>
            <Button
              variant={scale === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setScale('month')}
            >
              Month
            </Button>
            <Button
              variant={scale === 'year' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setScale('year')}
            >
              Year
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => window.print()}>
                Export to PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                Export to Excel
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Import from Excel</DropdownMenuItem>
              <DropdownMenuItem>Import from MS Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={showFullColumns ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowFullColumns(!showFullColumns)}
          >
            <Settings className="h-4 w-4 mr-2" />
            {showFullColumns ? 'Show Fewer Columns' : 'Show More Columns'}
          </Button>

          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="flex">
          {/* Task List */}
          <div className={`border-r bg-gray-50 ${showFullColumns ? 'min-w-[800px]' : 'min-w-[400px]'}`}>
            {/* Headers */}
            <div className="border-b bg-blue-900 text-white p-3">
              <div className={`grid gap-4 text-sm font-medium ${
                showFullColumns 
                  ? 'grid-cols-6' 
                  : 'grid-cols-3'
              }`}>
                <div>Activity</div>
                <div>Sub Activity</div>
                <div>Progress</div>
                {showFullColumns && (
                  <>
                    <div>Location</div>
                    <div>Contractor</div>
                    <div>Actions</div>
                  </>
                )}
              </div>
            </div>

            {/* Task Rows */}
            <div className="divide-y">
              {ganttTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                  style={{ height: '40px' }}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className={`grid gap-4 text-sm items-center h-full ${
                    showFullColumns 
                      ? 'grid-cols-6' 
                      : 'grid-cols-3'
                  }`}>
                    <div className="truncate font-medium">{task.activity || task.name}</div>
                    <div className="truncate text-gray-600">{task.subActivity || '-'}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <Progress value={task.progress || 0} className="h-2" />
                      </div>
                      <span className="text-xs">{task.progress || 0}%</span>
                    </div>
                    {showFullColumns && (
                      <>
                        <div className="truncate text-gray-600">{task.location || '-'}</div>
                        <div className="truncate text-gray-600">{task.contractor || '-'}</div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex-1 overflow-x-auto" ref={chartRef}>
            <div className="relative" style={{ width: timeline.length * dayWidth + 'px', minHeight: ganttTasks.length * 40 + 60 + 'px' }}>
              {/* Timeline Headers */}
              <div className="sticky top-0 bg-blue-900 text-white border-b z-10" style={{ height: '60px' }}>
                <div className="flex">
                  {timeline.map((date, index) => (
                    <div
                      key={index}
                      className="border-r border-blue-800 flex items-center justify-center text-sm font-medium"
                      style={{ width: dayWidth + 'px', height: '60px' }}
                    >
                      {scale === 'day' && date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
                      {scale === 'month' && date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      {scale === 'year' && date.getFullYear()}
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Bars */}
              <div className="relative">
                {/* Grid Lines */}
                {timeline.map((_, index) => (
                  <div
                    key={index}
                    className="absolute border-r border-gray-200"
                    style={{
                      left: index * dayWidth + 'px',
                      top: 0,
                      bottom: 0,
                      width: '1px'
                    }}
                  />
                ))}

                {/* Today Marker */}
                <div
                  className="absolute bg-red-500 z-20"
                  style={{
                    left: ((new Date().getTime() - minDate.getTime()) / (24 * 60 * 60 * 1000)) * (dayWidth / (scale === 'day' ? 1 : scale === 'month' ? 30 : 365)) + 'px',
                    top: 0,
                    bottom: 0,
                    width: '2px'
                  }}
                />

                {/* Task Bars */}
                {ganttTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`absolute rounded cursor-pointer transition-all hover:shadow-md ${getStatusColor(task.status)} ${getPriorityColor(task.priority)} border-2`}
                    style={{
                      left: task.x + 'px',
                      top: task.y + 'px',
                      width: task.width + 'px',
                      height: '20px'
                    }}
                    onClick={() => setSelectedTask(task)}
                  >
                    <div className="flex items-center justify-center h-full text-white text-xs font-medium truncate px-2">
                      {task.progress || 0}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          onUpdate={(updates: Partial<Task>) => {
            updateTaskMutation.mutate({ id: selectedTask.id, updates });
          }}
        />
      )}

      {/* Empty State */}
      {tasks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Tasks Found
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first task to see the Gantt chart visualization
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}