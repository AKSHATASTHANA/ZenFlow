import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Target, Calendar, User, MoreVertical, Plus, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { Milestone } from "@shared/schema";

interface MilestoneTableProps {
  milestones: Milestone[];
  projectId: number;
  isLoading: boolean;
}

export function MilestoneTable({ milestones, projectId, isLoading }: MilestoneTableProps) {
  const queryClient = useQueryClient();

  const updateMilestoneMutation = useMutation({
    mutationFn: (data: { id: number; status: string }) =>
      apiRequest(`/api/milestones/${data.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: data.status }),
        headers: { 'Content-Type': 'application/json' }
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/milestones'] });
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'default';
      case 'pending': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string, targetDate: string | Date) => {
    const isOverdue = new Date(targetDate) < new Date() && status !== 'completed';
    
    if (status === 'completed') {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (isOverdue) {
      return <AlertTriangle className="h-4 w-4 text-red-600" />;
    } else {
      return <Clock className="h-4 w-4 text-blue-600" />;
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTimeStatus = (targetDate: string | Date, actualDate?: string | Date | null) => {
    const target = new Date(targetDate);
    const now = new Date();
    
    if (actualDate) {
      const actual = new Date(actualDate);
      const diffDays = Math.round((actual.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 0) {
        return { text: `Completed ${Math.abs(diffDays)} days early`, color: 'text-green-600' };
      } else {
        return { text: `Completed ${diffDays} days late`, color: 'text-red-600' };
      }
    }
    
    const diffDays = Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, color: 'text-red-600' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-orange-600' };
    } else if (diffDays <= 7) {
      return { text: `${diffDays} days remaining`, color: 'text-orange-600' };
    } else {
      return { text: `${diffDays} days remaining`, color: 'text-gray-600' };
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Milestones</h3>
          <Badge variant="outline">{milestones.length}</Badge>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      {/* Milestones Table */}
      {milestones.length > 0 ? (
        <div className="border rounded-lg overflow-hidden bg-white">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-900 hover:bg-blue-900">
                <TableHead className="text-white font-semibold">Milestone</TableHead>
                <TableHead className="text-white font-semibold">Target Date</TableHead>
                <TableHead className="text-white font-semibold">Status</TableHead>
                <TableHead className="text-white font-semibold">Owner</TableHead>
                <TableHead className="text-white font-semibold">Description</TableHead>
                <TableHead className="text-white font-semibold">Time Status</TableHead>
                <TableHead className="text-white font-semibold w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {milestones.map((milestone) => {
                const timeStatus = getTimeStatus(milestone.targetDate.toString(), milestone.actualDate?.toString());
                
                return (
                  <TableRow key={milestone.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(milestone.status, milestone.targetDate.toString())}
                        <span>{milestone.name}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{formatDate(milestone.targetDate)}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant={getStatusColor(milestone.status)}
                        className="capitalize"
                      >
                        {milestone.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {milestone.ownerId ? `User ${milestone.ownerId}` : '—'}
                        </span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <span className="text-sm text-gray-600 line-clamp-2">
                        {milestone.description || '—'}
                      </span>
                    </TableCell>
                    
                    <TableCell>
                      <span className={`text-sm font-medium ${timeStatus.color}`}>
                        {timeStatus.text}
                      </span>
                      {milestone.actualDate && (
                        <div className="text-xs text-gray-500 mt-1">
                          Completed: {formatDate(milestone.actualDate)}
                        </div>
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => updateMilestoneMutation.mutate({ 
                              id: milestone.id, 
                              status: 'completed' 
                            })}
                            disabled={milestone.status === 'completed'}
                          >
                            Mark Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateMilestoneMutation.mutate({ 
                              id: milestone.id, 
                              status: 'in-progress' 
                            })}
                            disabled={milestone.status === 'in-progress'}
                          >
                            Mark In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Milestone</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete Milestone
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Milestones Found
            </h3>
            <p className="text-gray-500 mb-6">
              Create milestones to track important project deliverables and deadlines
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Milestone
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      {milestones.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {milestones.length}
              </div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {milestones.filter(m => m.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {milestones.filter(m => m.status === 'in-progress').length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {milestones.filter(m => 
                  new Date(m.targetDate) < new Date() && m.status !== 'completed'
                ).length}
              </div>
              <div className="text-sm text-gray-600">Overdue</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}