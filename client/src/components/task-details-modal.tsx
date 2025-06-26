import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, MapPin, Package, Image, FileText, Edit, Save, X } from "lucide-react";
import type { Task } from "@shared/schema";

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updates: Partial<Task>) => void;
}

export function TaskDetailsModal({ task, isOpen, onClose, onUpdate }: TaskDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
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

  const parseMaterials = (materials: string | null) => {
    if (!materials) return [];
    try {
      return typeof materials === 'string' ? JSON.parse(materials) : materials;
    } catch {
      return [];
    }
  };

  const parseHierarchy = (hierarchy: string | null) => {
    if (!hierarchy) return {};
    try {
      return typeof hierarchy === 'string' ? JSON.parse(hierarchy) : hierarchy;
    } catch {
      return {};
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {isEditing ? 'Edit Task' : 'Task Details'}
            </DialogTitle>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Task Name
                </label>
                {isEditing ? (
                  <Input
                    value={editedTask.name}
                    onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                  />
                ) : (
                  <p className="text-lg font-semibold">{task.name}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Activity
                </label>
                {isEditing ? (
                  <Input
                    value={editedTask.activity || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, activity: e.target.value })}
                  />
                ) : (
                  <p>{task.activity || '—'}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Sub Activity
                </label>
                {isEditing ? (
                  <Input
                    value={editedTask.subActivity || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, subActivity: e.target.value })}
                  />
                ) : (
                  <p>{task.subActivity || '—'}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Description
                </label>
                {isEditing ? (
                  <Textarea
                    value={editedTask.description || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600">{task.description || '—'}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Status and Priority */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Status
                  </label>
                  {isEditing ? (
                    <Select
                      value={editedTask.status}
                      onValueChange={(value) => setEditedTask({ ...editedTask, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={getStatusColor(task.status)} className="capitalize">
                      {task.status.replace('-', ' ')}
                    </Badge>
                  )}
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Priority
                  </label>
                  {isEditing ? (
                    <Select
                      value={editedTask.priority}
                      onValueChange={(value) => setEditedTask({ ...editedTask, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant={getPriorityColor(task.priority)} className="capitalize">
                      {task.priority}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Progress */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Progress
                </label>
                {isEditing ? (
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={editedTask.progress || 0}
                    onChange={(e) => setEditedTask({ ...editedTask, progress: parseInt(e.target.value) || 0 })}
                  />
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{task.progress || 0}%</span>
                    </div>
                    <Progress value={task.progress || 0} className="h-3" />
                  </div>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Duration (days)
                </label>
                {isEditing ? (
                  <Input
                    type="number"
                    min="1"
                    value={editedTask.duration}
                    onChange={(e) => setEditedTask({ ...editedTask, duration: parseInt(e.target.value) || 1 })}
                  />
                ) : (
                  <p>{task.duration} day(s)</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Planned Dates
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <p className="text-gray-600">{formatDate(task.startDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <p className="text-gray-600">{formatDate(task.endDate)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Actual Dates
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Actual Start</label>
                  <p className="text-gray-600">{formatDate(task.actualStartDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Actual End</label>
                  <p className="text-gray-600">{formatDate(task.actualEndDate)}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Assignment and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Assignment
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Contractor</label>
                  {isEditing ? (
                    <Input
                      value={editedTask.contractor || ''}
                      onChange={(e) => setEditedTask({ ...editedTask, contractor: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-600">{task.contractor || '—'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Updated By</label>
                  <p className="text-gray-600">{task.updatedBy || '—'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  {isEditing ? (
                    <Input
                      value={editedTask.location || ''}
                      onChange={(e) => setEditedTask({ ...editedTask, location: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-600">{task.location || '—'}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Hierarchy</label>
                  <div className="text-gray-600">
                    {Object.values(parseHierarchy(task.hierarchy)).filter(Boolean).join(' > ') || '—'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Materials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5" />
              Materials
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {parseMaterials(task.materials).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {parseMaterials(task.materials).map((material: any, index: number) => (
                    <div key={index} className="bg-white rounded p-3 border">
                      <div className="font-medium">{material.name || `Material ${index + 1}`}</div>
                      <div className="text-sm text-gray-600">
                        Qty: {material.plannedQty || '—'} {material.unit || ''}
                      </div>
                      {material.actualQty && (
                        <div className="text-sm text-gray-600">
                          Actual: {material.actualQty} {material.unit || ''}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No materials specified</p>
              )}
            </div>
          </div>

          {/* Photo and Notes */}
          {(task.photoUrl || task.notes) && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Information
                </h3>
                
                {task.photoUrl && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block flex items-center gap-2">
                      <Image className="h-4 w-4" />
                      Photo
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <img 
                        src={task.photoUrl} 
                        alt="Task photo"
                        className="max-w-full max-h-64 mx-auto rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <p className="text-sm text-gray-500 mt-2">{task.photoUrl}</p>
                    </div>
                  </div>
                )}

                {task.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Notes</label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{task.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}