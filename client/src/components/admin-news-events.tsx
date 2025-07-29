import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Calendar, Edit, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { NewsEvent, InsertNewsEvent } from "@shared/schema";

export function AdminNewsEvents() {
  const [selectedType, setSelectedType] = useState<"news" | "event" | "all">("all");
  const [editingItem, setEditingItem] = useState<NewsEvent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: newsEvents, isLoading, error } = useQuery<NewsEvent[]>({
    queryKey: ["/api/news-events"],
    queryFn: async () => {
      const response = await fetch("/api/news-events");
      if (!response.ok) throw new Error("Failed to fetch news and events");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertNewsEvent) => {
      return apiRequest("/api/news-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news-events"] });
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({
        title: "Success",
        description: "News/Event created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create news/event",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<InsertNewsEvent> }) => {
      return apiRequest(`/api/news-events/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news-events"] });
      setIsDialogOpen(false);
      setEditingItem(null);
      toast({
        title: "Success",
        description: "News/Event updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update news/event",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest(`/api/news-events/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/news-events"] });
      toast({
        title: "Success",
        description: "News/Event deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete news/event",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (formData: FormData) => {
    const data: InsertNewsEvent = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      type: formData.get("type") as "news" | "event",
      imageUrl: formData.get("imageUrl") as string || null,
      eventDate: formData.get("eventDate") ? new Date(formData.get("eventDate") as string) : null,
      isPublished: formData.get("isPublished") === "on",
    };

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const filteredItems = newsEvents?.filter(item => 
    selectedType === "all" || item.type === selectedType
  ) || [];

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to load news and events
          </h3>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">News & Events Management</h2>
          <p className="text-gray-600">Manage hospital news articles and upcoming events</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setEditingItem(null);
                setIsDialogOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add News/Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit News/Event" : "Add News/Event"}
              </DialogTitle>
              <DialogDescription>
                Create or update news articles and events for the hospital website.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(new FormData(e.currentTarget));
            }} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingItem?.title || ""}
                  required
                />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select name="type" defaultValue={editingItem?.type || "news"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  rows={4}
                  defaultValue={editingItem?.content || ""}
                  required
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  defaultValue={editingItem?.imageUrl || ""}
                />
              </div>
              <div>
                <Label htmlFor="eventDate">Event Date (for events only)</Label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="datetime-local"
                  defaultValue={editingItem?.eventDate ? 
                    format(new Date(editingItem.eventDate), "yyyy-MM-dd'T'HH:mm") : ""
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  name="isPublished"
                  defaultChecked={editingItem?.isPublished ?? true}
                />
                <Label htmlFor="isPublished">Published</Label>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {editingItem ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={selectedType === "all" ? "default" : "outline"}
          onClick={() => setSelectedType("all")}
          size="sm"
        >
          All
        </Button>
        <Button
          variant={selectedType === "news" ? "default" : "outline"}
          onClick={() => setSelectedType("news")}
          size="sm"
        >
          News
        </Button>
        <Button
          variant={selectedType === "event" ? "default" : "outline"}
          onClick={() => setSelectedType("event")}
          size="sm"
        >
          Events
        </Button>
      </div>

      {/* News/Events List */}
      {isLoading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {item.title}
                      {!item.isPublished && <EyeOff className="h-4 w-4 text-gray-400" />}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                      <Badge variant={item.type === "news" ? "default" : "secondary"}>
                        {item.type}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {item.eventDate 
                          ? format(new Date(item.eventDate), "MMM d, yyyy")
                          : format(new Date(item.createdAt), "MMM d, yyyy")
                        }
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingItem(item);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteMutation.mutate(item.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {item.content}
                </p>
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-32 object-cover rounded-lg mt-3"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </CardContent>
            </Card>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No {selectedType === "all" ? "items" : selectedType} found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}