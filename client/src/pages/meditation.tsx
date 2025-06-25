import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Play, Headphones, BarChart3, User, Bell } from "lucide-react";
import MeditationTimer from "@/components/meditation-timer";
import AmbientSounds from "@/components/ambient-sounds";
import ProgressTracking from "@/components/progress-tracking";
import GuidedBreathing from "@/components/guided-breathing";

export default function MeditationPage() {
  const [activeTab, setActiveTab] = useState("meditate");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-secondary/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Leaf className="text-white" size={20} />
              </div>
              <h1 className="text-2xl font-bold text-soft-charcoal">Serenity</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setActiveTab("meditate")}
                className={`transition-colors font-medium ${
                  activeTab === "meditate" ? "text-primary" : "text-soft-charcoal hover:text-primary"
                }`}
              >
                Meditate
              </button>
              <button 
                onClick={() => setActiveTab("sounds")}
                className={`transition-colors font-medium ${
                  activeTab === "sounds" ? "text-primary" : "text-soft-charcoal hover:text-primary"
                }`}
              >
                Sounds
              </button>
              <button 
                onClick={() => setActiveTab("progress")}
                className={`transition-colors font-medium ${
                  activeTab === "progress" ? "text-primary" : "text-soft-charcoal hover:text-primary"
                }`}
              >
                Progress
              </button>
              <button 
                onClick={() => setActiveTab("breathing")}
                className={`transition-colors font-medium ${
                  activeTab === "breathing" ? "text-primary" : "text-soft-charcoal hover:text-primary"
                }`}
              >
                Breathing
              </button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="text-primary" size={20} />
              </Button>
              <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--gentle-green))] to-secondary rounded-full" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Hero */}
        <section className="mb-12">
          <Card className="gradient-soft p-8 text-center card-float border-0">
            <div className="mb-8 relative">
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Peaceful meditation space" 
                className="w-full max-w-md mx-auto rounded-lg shadow-lg opacity-90" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-lg max-w-md mx-auto" />
            </div>
            
            <h2 className="text-4xl font-bold text-soft-charcoal mb-4">
              Welcome to Your <span className="text-primary">Peaceful Mind</span>
            </h2>
            <p className="text-lg text-soft-charcoal/80 mb-8 max-w-2xl mx-auto">
              Find inner peace with guided meditations, ambient sounds, and mindful breathing exercises designed to help you create a consistent meditation practice.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="card-float"
                onClick={() => setActiveTab("meditate")}
              >
                <Play className="mr-2" size={20} />
                Start Meditating
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="card-float border-primary/20"
                onClick={() => setActiveTab("sounds")}
              >
                <Headphones className="mr-2" size={20} />
                Explore Sounds
              </Button>
            </div>
          </Card>
        </section>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="meditate">Meditate</TabsTrigger>
            <TabsTrigger value="sounds">Sounds</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
          </TabsList>

          <TabsContent value="meditate" className="space-y-8">
            <MeditationTimer />
          </TabsContent>

          <TabsContent value="sounds" className="space-y-8">
            <AmbientSounds />
          </TabsContent>

          <TabsContent value="progress" className="space-y-8">
            <ProgressTracking />
          </TabsContent>

          <TabsContent value="breathing" className="space-y-8">
            <GuidedBreathing />
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-secondary/20 px-4 py-2">
        <div className="flex justify-around">
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 px-3 ${activeTab === "meditate" ? "text-primary" : "text-soft-charcoal/60"}`}
            onClick={() => setActiveTab("meditate")}
          >
            <Play size={20} className="mb-1" />
            <span className="text-xs font-medium">Meditate</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 px-3 ${activeTab === "sounds" ? "text-primary" : "text-soft-charcoal/60"}`}
            onClick={() => setActiveTab("sounds")}
          >
            <Headphones size={20} className="mb-1" />
            <span className="text-xs font-medium">Sounds</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 px-3 ${activeTab === "progress" ? "text-primary" : "text-soft-charcoal/60"}`}
            onClick={() => setActiveTab("progress")}
          >
            <BarChart3 size={20} className="mb-1" />
            <span className="text-xs font-medium">Progress</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex flex-col items-center py-2 px-3 ${activeTab === "breathing" ? "text-primary" : "text-soft-charcoal/60"}`}
            onClick={() => setActiveTab("breathing")}
          >
            <User size={20} className="mb-1" />
            <span className="text-xs font-medium">Breathing</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
