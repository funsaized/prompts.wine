"use client";

import * as React from "react";
import {
  Code,
  Copy,
  Settings,
  User,
  FileText,
  Folder,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FileTree, type FileTreeItem } from "@/components/ui/file-tree";

const sampleFileTreeData: FileTreeItem[] = [
  {
    name: "src",
    type: "folder",
    path: "src",
    isOpen: true,
    children: [
      {
        name: "app",
        type: "folder",
        path: "app",
        isOpen: true,
        children: [
          { name: "page.tsx", type: "file", path: "app/page.tsx" },
          { name: "layout.tsx", type: "file", path: "app/layout.tsx" },
          { name: "globals.css", type: "file", path: "app/globals.css" },
          {
            name: "components",
            type: "folder",
            path: "app/components",
            children: [
              {
                name: "page.tsx",
                type: "file",
                path: "app/components/page.tsx",
              },
            ],
          },
        ],
      },
      {
        name: "components",
        type: "folder",
        path: "components",
        isOpen: true,
        children: [
          {
            name: "ui",
            type: "folder",
            path: "components/ui",
            isOpen: true,
            children: [
              {
                name: "button.tsx",
                type: "file",
                path: "components/ui/button.tsx",
              },
              {
                name: "tabs.tsx",
                type: "file",
                path: "components/ui/tabs.tsx",
              },
              {
                name: "scroll-area.tsx",
                type: "file",
                path: "components/ui/scroll-area.tsx",
              },
              {
                name: "collapsible.tsx",
                type: "file",
                path: "components/ui/collapsible.tsx",
              },
              {
                name: "file-tree.tsx",
                type: "file",
                path: "components/ui/file-tree.tsx",
              },
            ],
          },
        ],
      },
      {
        name: "lib",
        type: "folder",
        path: "lib",
        children: [{ name: "utils.ts", type: "file", path: "lib/utils.ts" }],
      },
    ],
  },
  {
    name: "public",
    type: "folder",
    path: "public",
    children: [
      { name: "next.svg", type: "file", path: "public/next.svg" },
      { name: "vercel.svg", type: "file", path: "public/vercel.svg" },
    ],
  },
  { name: "package.json", type: "file", path: "package.json" },
  { name: "next.config.ts", type: "file", path: "next.config.ts" },
  { name: "tailwind.config.ts", type: "file", path: "tailwind.config.ts" },
  { name: "README.md", type: "file", path: "README.md" },
];

export default function ComponentsPage(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<string>("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);

  const handleFileSelect = React.useCallback((item: FileTreeItem) => {
    setSelectedFile(item.name);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            Component Library
          </h1>
          <p className="text-muted-foreground max-w-3xl text-xl">
            Showcasing shadcn/ui components with Green theme integration and
            OriginUI-inspired patterns. Built with Next.js 15, Tailwind CSS v4,
            and TypeScript.
          </p>
        </div>

        {/* Main Layout - OriginUI inspired grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Sidebar - File Tree */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-card-foreground text-lg font-semibold">
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
            <Tabs defaultValue="tabs" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
                <TabsTrigger value="tabs">Tabs</TabsTrigger>
                <TabsTrigger value="collapsible">Collapsible</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>

              {/* Button Examples */}
              <TabsContent value="buttons" className="mt-6">
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-card-foreground mb-4 text-lg font-semibold">
                    Button Variants with Green Theme
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                          Primary Buttons
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Button>Default</Button>
                          <Button size="sm">Small</Button>
                          <Button size="lg">Large</Button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                          Secondary Buttons
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="secondary">Secondary</Button>
                          <Button variant="outline">Outline</Button>
                          <Button variant="ghost">Ghost</Button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                          With Icons
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Button>
                            <User className="mr-2 h-4 w-4" />
                            Profile
                          </Button>
                          <Button variant="outline">
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                          Icon Only
                        </h4>
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
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-card-foreground mb-4 text-lg font-semibold">
                    Nested Tab Navigation
                  </h3>
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="notifications">
                        Notifications
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="text-foreground mb-2 font-medium">
                          Project Overview
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          This is the overview tab content with Green theme
                          accents. Notice how the active tab uses our primary
                          green color.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="mt-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="text-foreground mb-2 font-medium">
                          Analytics Dashboard
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Analytics content would go here, showcasing data
                          visualization with our green color scheme.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="reports" className="mt-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="text-foreground mb-2 font-medium">
                          Report Center
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Generated reports and data exports would be displayed
                          here.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="notifications" className="mt-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="text-foreground mb-2 font-medium">
                          Notification Settings
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          Configure notification preferences and alert settings.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              {/* Collapsible Examples */}
              <TabsContent value="collapsible" className="mt-6">
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-card-foreground mb-4 text-lg font-semibold">
                    Collapsible Sections
                  </h3>
                  <div className="space-y-4">
                    <Collapsible
                      open={isCollapsibleOpen}
                      onOpenChange={setIsCollapsibleOpen}
                      className="rounded-lg border"
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-auto w-full justify-between p-4"
                        >
                          <div className="flex items-center gap-2">
                            <Folder className="h-4 w-4" />
                            <span>Advanced Settings</span>
                          </div>
                          <span className="text-muted-foreground text-xs">
                            {isCollapsibleOpen ? "Collapse" : "Expand"}
                          </span>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="px-4 pb-4">
                        <div className="space-y-2 text-sm">
                          <div className="bg-muted rounded p-3">
                            <p className="text-foreground mb-1 font-medium">
                              API Configuration
                            </p>
                            <p className="text-muted-foreground">
                              Configure API endpoints and authentication
                              settings.
                            </p>
                          </div>
                          <div className="bg-muted rounded p-3">
                            <p className="text-foreground mb-1 font-medium">
                              Database Options
                            </p>
                            <p className="text-muted-foreground">
                              Set up database connections and query
                              optimization.
                            </p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="rounded-lg border p-4">
                      <h4 className="text-foreground mb-2 flex items-center gap-2 font-medium">
                        <FileText className="h-4 w-4" />
                        Selected File
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {selectedFile || "No file selected"}
                        {selectedFile &&
                          " - Click on files in the project explorer to see them here."}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Layout Examples */}
              <TabsContent value="layout" className="mt-6">
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-card-foreground mb-4 text-lg font-semibold">
                    OriginUI-Inspired Layouts
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <h4 className="text-foreground font-medium">
                        Card Grid Layout
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-muted/50 hover:bg-muted rounded-lg border p-4 transition-colors"
                          >
                            <div className="bg-primary/20 mb-2 h-2 rounded" />
                            <div className="bg-muted-foreground/30 h-1 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-foreground font-medium">
                        Scrollable Content
                      </h4>
                      <ScrollArea className="h-40 rounded-lg border p-4">
                        {Array.from({ length: 20 }).map((_, i) => (
                          <div
                            key={i}
                            className="text-foreground border-b py-2 text-sm last:border-b-0"
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
        <div className="bg-card mt-12 rounded-lg border p-6 text-center">
          <p className="text-muted-foreground text-sm">
            Built with Next.js 15, Tailwind CSS v4, shadcn/ui components, and
            Green theme integration. Inspired by OriginUI design patterns.
          </p>
        </div>
      </div>
    </div>
  );
}
