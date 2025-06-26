import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, User, MapPin, Plus, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { apiRequest } from "@/lib/queryClient";
import type { Task } from "@shared/schema";

interface KanbanBoardProps {
  tasks: Task[];
  projectId: number;
  isLoading: boolean;
}

const statusColumns = [
  { id: 'pending', title: 'Pending', color: 'bg-gray-100' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
  { id: 'completed', title: 'Completed', color: 'bg-green-100' },
  { id: 'cancelled', title: 'Cancelled', color: 'bg-red-100' },
];

export function KanbanBoard({ tasks, projectId, isLoading }: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: (data: { id: number; status: string }) =>
      apiRequest(`/api/tasks/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: data.status }),
        headers: { 'Content-Type': 'application/json' }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== newStatus) {
      updateTaskMutation.mutate({ id: draggedTask.id, status: newStatus });
    }
    setDraggedTask(null);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
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
      {/* Board Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {statusColumns.map(column => (
            <div key={column.id} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${column.color.replace('bg-', 'bg-').replace('-100', '-500')}`} />
              <span className="text-sm font-medium">{column.title}</span>
              <Badge variant="outline" className="text-xs">
                {getTasksByStatus(column.id).length}
              </Badge>
            </div>
          ))}
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statusColumns.map((column) => (
          <div
            key={column.id}
            className={`${column.color} rounded-lg p-4 min-h-[500px]`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">{column.title}</h3>
              <Badge variant="outline" className="bg-white">
                {getTasksByStatus(column.id).length}
              </Badge>
            </div>

            <div className="space-y-3">
              {getTasksByStatus(column.id).map((task) => (
                <Card
                  key={task.id}
                  className="cursor-move hover:shadow-md transition-shadow bg-white border-l-4 border-l-blue-500"
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-sm line-clamp-2">
                        {task.activity || task.name}
                      </h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete Task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {task.subActivity && (
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {task.subActivity}
                      </p>
                    )}

                    <div className="space-y-3">
                      {/* Priority */}
                      <div className="flex items-center justify-between">
                        <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          #{task.id}
                        </span>
                      </div>

                      {/* Progress */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{task.progress || 0}%</span>
                        </div>
                        <Progress value={task.progress || 0} className="h-2" />
                      </div>

                      {/* Dates */}
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(task.startDate)}</span>
                        </div>
                        <span>→</span>
                        <span>{formatDate(task.endDate)}</span>
                      </div>

                      {/* Additional Info */}
                      <div className="space-y-1">
                        {task.contractor && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <User className="h-3 w-3" />
                            <span className="truncate">{task.contractor}</span>
                          </div>
                        )}
                        {task.location && (
                          <div className="flex items-center gap-1 text-xs text-gray-600">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{task.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Materials */}
                      {task.materials && (
                        <div className="text-xs">
                          <div className="text-gray-600 mb-1">Materials:</div>
                          <div className="bg-gray-50 rounded p-2 text-gray-700">
                            {typeof task.materials === 'string' 
                              ? task.materials 
                              : JSON.stringify(task.materials)}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {getTasksByStatus(column.id).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-sm">No tasks in {column.title.toLowerCase()}</div>
                  <div className="text-xs mt-1">Drag tasks here to update status</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="grid grid-cols-4 gap-4 mb-6 opacity-20">
              {statusColumns.map(column => (
                <div key={column.id} className={`h-32 ${column.color} rounded-lg`} />
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Tasks Found
            </h3>
            <p className="text-gray-500 mb-6">
              Create your first task to see the Kanban board in action
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