import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Building2, Users, Wrench, Calendar } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

const categoryIcons = {
  facility: Building2,
  staff: Users,
  equipment: Wrench,
  events: Calendar,
};

const categoryColors = {
  facility: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  staff: "bg-green-100 text-green-800 hover:bg-green-200",
  equipment: "bg-purple-100 text-purple-800 hover:bg-purple-200",
  events: "bg-orange-100 text-orange-800 hover:bg-orange-200",
};

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: galleryImages, isLoading, error } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory 
        ? `/api/gallery?category=${selectedCategory}`
        : "/api/gallery";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch gallery images");
      return response.json();
    },
  });

  const categories = ["facility", "staff", "equipment", "events"];

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Unable to load gallery
          </h2>
          <p className="text-gray-600">
            Please try again later or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hospital Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our state-of-the-art facilities, dedicated medical staff, 
              advanced equipment, and special events at Shri Krishna Mission Hospital.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="text-sm"
          >
            All Categories
          </Button>
          {categories.map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons];
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-6 w-20 mt-3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : galleryImages && galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image) => {
              const Icon = categoryIcons[image.category as keyof typeof categoryIcons];
              return (
                <Card key={image.id} className="group overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = "/images/hospital.jpeg";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {image.title}
                    </h3>
                    {image.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                    <Badge 
                      className={`${categoryColors[image.category as keyof typeof categoryColors]} flex items-center gap-1 w-fit`}
                    >
                      <Icon className="h-3 w-3" />
                      {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No images found
            </h3>
            <p className="text-gray-600">
              {selectedCategory 
                ? `No images found in the ${selectedCategory} category.`
                : "No gallery images available at the moment."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}