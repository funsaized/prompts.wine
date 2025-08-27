"use client"

import * as React from "react"
import { Code, Copy, Settings, User, FileText, Folder, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FileTree, type FileTreeItem } from "@/components/ui/file-tree"

const sampleFileTreeData: FileTreeItem[] = [
  {
    name: "src",
    type: "folder",
    isOpen: true,
    children: [
      {
        name: "app",
        type: "folder",
        isOpen: true,
        children: [
          { name: "page.tsx", type: "file" },
          { name: "layout.tsx", type: "file" },
          { name: "globals.css", type: "file" },
          {
            name: "components",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file" }
            ]
          }
        ]
      },
      {
        name: "components",
        type: "folder",
        isOpen: true,
        children: [
          {
            name: "ui",
            type: "folder",
            isOpen: true,
            children: [
              { name: "button.tsx", type: "file" },
              { name: "tabs.tsx", type: "file" },
              { name: "scroll-area.tsx", type: "file" },
              { name: "collapsible.tsx", type: "file" },
              { name: "file-tree.tsx", type: "file" }
            ]
          }
        ]
      },
      {
        name: "lib",
        type: "folder",
        children: [
          { name: "utils.ts", type: "file" }
        ]
      }
    ]
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "next.svg", type: "file" },
      { name: "vercel.svg", type: "file" }
    ]
  },
  { name: "package.json", type: "file" },
  { name: "next.config.ts", type: "file" },
  { name: "tailwind.config.ts", type: "file" },
  { name: "README.md", type: "file" }
]

export default function ComponentsPage(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<string>("")
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false)

  const handleFileSelect = React.useCallback((item: FileTreeItem) => {
    setSelectedFile(item.name)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Component Library
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Showcasing shadcn/ui components with Green theme integration and OriginUI-inspired patterns. 
            Built with Next.js 15, Tailwind CSS v4, and TypeScript.
          </p>
        </div>

        {/* Main Layout - OriginUI inspired grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Sidebar - File Tree */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Project Explorer
                </h3>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="h-96">
                <FileTree 
                  data={sampleFileTreeData}
                  onSelect={handleFileSelect}
                  selectedPath={selectedFile}
                />
              </ScrollArea>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="buttons" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
                <TabsTrigger value="tabs">Tabs</TabsTrigger>
                <TabsTrigger value="collapsible">Collapsible</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>

              {/* Button Examples */}
              <TabsContent value="buttons" className="mt-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                    Button Variants with Green Theme
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Primary Buttons</h4>
                        <div className="flex gap-2 flex-wrap">
                          <Button>Default</Button>
                          <Button size="sm">Small</Button>
                          <Button size="lg">Large</Button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Secondary Buttons</h4>
                        <div className="flex gap-2 flex-wrap">
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-muted-foreground">With Icons</h4>
                        <div className="flex gap-2 flex-wrap">
                          <Button>
                            <User className="h-4 w-4 mr-2" />
                            Profile
                          </Button>
                          <Button variant="outline">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Icon Only</h4>
                        <div className="flex gap-2">
                          <Button size="icon">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="outline">
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Tabs Examples */}
              <TabsContent value="tabs" className="mt-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                    Nested Tab Navigation
                  </h3>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2 text-foreground">Project Overview</h4>
                        <p className="text-sm text-muted-foreground">
                          This is the overview tab content with Green theme accents.
                          Notice how the active tab uses our primary green color.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2 text-foreground">Analytics Dashboard</h4>
                        <p className="text-sm text-muted-foreground">
                          Analytics content would go here, showcasing data visualization
                          with our green color scheme.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="reports" className="mt-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2 text-foreground">Report Center</h4>
                        <p className="text-sm text-muted-foreground">
                          Generated reports and data exports would be displayed here.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="notifications" className="mt-4">
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-medium mb-2 text-foreground">Notification Settings</h4>
                        <p className="text-sm text-muted-foreground">
                          Configure notification preferences and alert settings.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              {/* Collapsible Examples */}
              <TabsContent value="collapsible" className="mt-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                    Collapsible Sections
                  </h3>
                  <div className="space-y-4">
                    <Collapsible 
                      open={isCollapsibleOpen} 
                      onOpenChange={setIsCollapsibleOpen}
                      className="border rounded-lg"
                    >
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between p-4 h-auto"
                        >
                          <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4" />
                            <span>Advanced Settings</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {isCollapsibleOpen ? "Collapse" : "Expand"}
                          </span>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <div className="space-y-2 text-sm">
                          <div className="p-3 bg-muted rounded">
                            <p className="font-medium mb-1 text-foreground">API Configuration</p>
                            <p className="text-muted-foreground">
                              Configure API endpoints and authentication settings.
                            </p>
                          </div>
                          <div className="p-3 bg-muted rounded">
                            <p className="font-medium mb-1 text-foreground">Database Options</p>
                            <p className="text-muted-foreground">
                              Set up database connections and query optimization.
                            </p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2 text-foreground">
                        <FileText className="h-4 w-4" />
                        Selected File
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedFile || "No file selected"} 
                        {selectedFile && " - Click on files in the project explorer to see them here."}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Layout Examples */}
              <TabsContent value="layout" className="mt-6">
                <div className="bg-card border rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                    OriginUI-Inspired Layouts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Card Grid Layout</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div 
                            key={i}
                            className="p-4 border rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="h-2 bg-primary/20 rounded mb-2" />
                            <div className="h-1 bg-muted-foreground/30 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">Scrollable Content</h4>
                      <ScrollArea className="h-40 border rounded-lg p-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div 
                            key={i}
                            className="py-2 border-b last:border-b-0 text-sm text-foreground"
                          >
                            Scrollable item {i + 1}
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 p-6 bg-card border rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            Built with Next.js 15, Tailwind CSS v4, shadcn/ui components, and Green theme integration.
            Inspired by OriginUI design patterns.
          </p>
        </div>
      </div>
    </div>
  )
}