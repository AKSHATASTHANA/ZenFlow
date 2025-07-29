import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Calendar, Clock, Newspaper } from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";
import type { NewsEvent } from "@shared/schema";

export default function NewsEventsPage() {
  const [selectedType, setSelectedType] = useState<"news" | "event" | null>(null);

  const { data: newsEvents, isLoading, error } = useQuery<NewsEvent[]>({
    queryKey: ["/api/news-events", selectedType],
    queryFn: async () => {
      const url = selectedType 
        ? `/api/news-events?type=${selectedType}`
        : "/api/news-events";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch news and events");
      return response.json();
    },
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to load news and events
          </h2>
          <p className="text-gray-600">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  const upcomingEvents = newsEvents?.filter(item => 
    item.type === "event" && 
    item.eventDate && 
    isAfter(new Date(item.eventDate), new Date())
  ) || [];

  const pastEvents = newsEvents?.filter(item => 
    item.type === "event" && 
    item.eventDate && 
    isBefore(new Date(item.eventDate), new Date())
  ) || [];

  const news = newsEvents?.filter(item => item.type === "news") || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              News & Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and upcoming events 
              at Shri Krishna Mission Hospital.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button
            variant={selectedType === null ? "default" : "outline"}
            onClick={() => setSelectedType(null)}
            className="text-sm flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            All Updates
          </Button>
          <Button
            variant={selectedType === "news" ? "default" : "outline"}
            onClick={() => setSelectedType("news")}
            className="text-sm flex items-center gap-2"
          >
            <Newspaper className="h-4 w-4" />
            News
          </Button>
          <Button
            variant={selectedType === "event" ? "default" : "outline"}
            onClick={() => setSelectedType("event")}
            className="text-sm flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Events
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
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
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Events Section */}
            {(selectedType === null || selectedType === "event") && upcomingEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Upcoming Events
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingEvents.map((event) => (
                    <Card key={event.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-gray-900">
                              {event.title}
                            </CardTitle>
                            {event.eventDate && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                <Clock className="h-4 w-4" />
                                {format(new Date(event.eventDate), "EEEE, MMMM d, yyyy")}
                              </div>
                            )}
                          </div>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Event
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {event.content}
                        </p>
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-lg mt-4"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* News Section */}
            {(selectedType === null || selectedType === "news") && news.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Newspaper className="h-6 w-6 text-green-600" />
                  Latest News
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {news.map((newsItem) => (
                    <Card key={newsItem.id} className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-gray-900">
                              {newsItem.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                              <Clock className="h-4 w-4" />
                              {format(new Date(newsItem.createdAt), "MMMM d, yyyy")}
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            News
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {newsItem.content}
                        </p>
                        {newsItem.imageUrl && (
                          <img
                            src={newsItem.imageUrl}
                            alt={newsItem.title}
                            className="w-full h-48 object-cover rounded-lg mt-4"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Past Events Section */}
            {(selectedType === null || selectedType === "event") && pastEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-gray-600" />
                  Past Events
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {pastEvents.map((event) => (
                    <Card key={event.id} className="border-l-4 border-l-gray-400 opacity-75">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg text-gray-900">
                              {event.title}
                            </CardTitle>
                            {event.eventDate && (
                              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                <Clock className="h-4 w-4" />
                                {format(new Date(event.eventDate), "EEEE, MMMM d, yyyy")}
                              </div>
                            )}
                          </div>
                          <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                            Past Event
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">
                          {event.content}
                        </p>
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-48 object-cover rounded-lg mt-4"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {newsEvents && newsEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No updates found
                </h3>
                <p className="text-gray-600">
                  {selectedType 
                    ? `No ${selectedType} updates available at the moment.`
                    : "No news or events available at the moment."
                  }
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}