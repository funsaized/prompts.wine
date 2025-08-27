"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileTree, type FileTreeItem } from "@/components/ui/file-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileScan, Folder, Plus } from "lucide-react";
import Image from "next/image";

export default function Prompts(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<string>("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState<string>("all");

  const handleFileSelect = React.useCallback((item: FileTreeItem) => {
    setSelectedFile(item.name);
  }, []);

  // Filter function for file tree based on active tab
  const getFilteredFileTreeData = React.useCallback(() => {
    switch (activeFilter) {
      case "all":
        // For now, return all data
        return sampleFileTreeData;
      case "agents":
        // TODO: Filter for agent files
        return sampleFileTreeData;
      case "commands":
        // TODO: Filter for command files
        return sampleFileTreeData;
      default:
        return sampleFileTreeData;
    }
  }, [activeFilter]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto flex min-h-screen flex-col items-start justify-start space-y-8 p-4">
        <div className="space-y-4">
          <header className="flex flex-shrink-0 flex-col font-light uppercase">
            <h1 className="text-3xl tracking-tight sm:text-4xl">
              /prompts.wine
            </h1>
            <div className="mt-1 flex items-center gap-2 pl-2">
              <span>└─</span>
              <h2>
                A directory of instructions, agents, and workflows for LLMs &
                tools that have aged like fine wine 🍷
              </h2>
            </div>
            <div className="flex items-center gap-2 pl-2">
              <span>└─</span>
              <h2>
                Made by{" "}
                <a
                  href="https://s11a.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative top-1 inline-flex items-center gap-1.5 pl-1 transition-colors hover:text-white"
                >
                  <Image
                    alt="Sai Nimmagadda"
                    width={20}
                    height={20}
                    className="border-foreground size-5 rounded-full border transition-colors group-hover:border-white"
                    src="/face.png"
                  />
                  @Sai N. Nimmagadda
                </a>
              </h2>
            </div>
          </header>
        </div>

        {/* Main Layout - 3 column grid */}
        <div className="grid w-full flex-1 grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Sidebar - Tabs with nested File Tree */}
          <div className="lg:col-span-1">
            <Tabs
              value={activeFilter}
              onValueChange={setActiveFilter}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="agents">Agents</TabsTrigger>
                <TabsTrigger value="prompts">Prompts</TabsTrigger>
                <TabsTrigger value="commands">Commands</TabsTrigger>
              </TabsList>

              <TabsContent value={activeFilter} className="mt-4">
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
                      data={getFilteredFileTreeData()}
                      onSelect={handleFileSelect}
                      selectedPath={selectedFile}
                    />
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Quick Overview Card */}
              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-card-foreground mb-4 text-lg font-semibold capitalize">
                  {activeFilter}
                </h3>
                <p className="text-muted-foreground mb-4">
                  Explore the file tree to see various artifacts.
                </p>
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="text-foreground mb-2 font-medium">
                    Selected: {selectedFile || "No file selected"}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Click on files in the project explorer to select them.
                  </p>
                </div>
              </div>
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
                        <FileScan className="h-4 w-4" />
                        <span>Details</span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {isCollapsibleOpen ? "Collapse" : "Expand"}
                      </span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pt-2 pb-4">
                    <div className="space-y-2 text-sm">
                      <div className="bg-muted rounded p-3">
                        <p className="text-foreground mb-1 font-medium">
                          API Configuration
                        </p>
                        <p className="text-muted-foreground">
                          Configure API endpoints and authentication settings.
                        </p>
                      </div>
                      <div className="bg-muted rounded p-3">
                        <p className="text-foreground mb-1 font-medium">
                          Database Options
                        </p>
                        <p className="text-muted-foreground">
                          Set up database connections and query optimization.
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button variant="default" size="lg" asChild>
            <a href="/components">View Components</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://github.com/funsaized/prompts.wine"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

const sampleFileTreeData: FileTreeItem[] = [
  {
    name: ".claude",
    type: "folder",
    isOpen: false,
    children: [
      {
        name: "agents",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "universal-app",
            type: "folder",
            children: [{ name: "CLAUDE.md", type: "file" }],
          },
        ],
      },
      {
        name: "commands",
        type: "folder",
        isOpen: false,
        children: [{ name: "fix-github-issue.md", type: "file" }],
      },
      { name: "settings.json", type: "file" },
    ],
  },
  {
    name: ".github",
    type: "folder",
    isOpen: false,
    children: [
      {
        name: "chatmodes",
        type: "folder",
        isOpen: false,
        children: [{ name: "4.1-Beast.chatmode.md", type: "file" }],
      },
      {
        name: "instructions",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "ai-prompt-engineering-safety-best-practices.instructions.md",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    name: ".windsurf",
    type: "folder",
    isOpen: false,
    children: [
      {
        name: "rules",
        type: "folder",
        isOpen: false,
        children: [
          {
            name: "universal-app",
            type: "folder",
            children: [
              { name: "angular_fullstack_rules.md", type: "file" },
              { name: "data_science_rules.md", type: "file" },
              { name: "monorepo-tamagui.md", type: "file" },
              { name: "project_instructions.md", type: "file" },
              { name: "react_nextjs_rules.md", type: "file" },
            ],
          },
        ],
      },
    ],
  },
];
