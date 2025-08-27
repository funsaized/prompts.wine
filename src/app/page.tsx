"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { FileTree } from "@/components/ui/file-tree";
import { ContentViewer } from "@/components/ui/content-viewer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileScan, Folder, Plus, Download, Tag, Clock } from "lucide-react";
import Image from "next/image";
import { FileTreeItem } from "@/lib/content-types";
// Import just the type, not the server functions
export interface StaticContentData {
  contentTree: FileTreeItem[];
  definitions: {
    categories: Record<string, any>;
    tags: Record<string, any>;
    patterns: any[];
  };
  contentMap: Record<string, string>;
  stats: {
    totalFiles: number;
    totalCategories: number;
    totalTags: number;
    categoryCount: Record<string, number>;
    tagCount: Record<string, number>;
  };
  filteredContent: {
    all: FileTreeItem[];
    agents: FileTreeItem[];
    prompts: FileTreeItem[];
    commands: FileTreeItem[];
    instructions: FileTreeItem[];
  };
}

export default function Prompts(): React.JSX.Element {
  const [selectedFile, setSelectedFile] = React.useState<string>("");
  const [selectedFileContent, setSelectedFileContent] =
    React.useState<string>("");
  const [isCollapsibleOpen, setIsCollapsibleOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState<string>("all");
  const [contentData, setContentData] =
    React.useState<StaticContentData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Load static content data on mount
  React.useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true);
        const response = await fetch("/content-data.json");
        if (!response.ok) {
          throw new Error("Failed to load content data");
        }
        const data: StaticContentData = await response.json();
        setContentData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
        console.error("Error loading content:", err);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, []);

  const handleFileSelect = React.useCallback(
    (item: FileTreeItem) => {
      if (item.type === "file" && contentData) {
        setSelectedFile(item.path);
        const content =
          contentData.contentMap[item.path] || "Content not found";
        setSelectedFileContent(content);
      }
    },
    [contentData]
  );

  const filteredTree = React.useMemo(() => {
    if (!contentData) return [];
    return (
      contentData.filteredContent[
        activeFilter as keyof typeof contentData.filteredContent
      ] || []
    );
  }, [contentData, activeFilter]);

  const selectedFileItem = React.useMemo(() => {
    function findFileByPath(
      items: FileTreeItem[],
      path: string
    ): FileTreeItem | null {
      for (const item of items) {
        if (item.path === path) {
          return item;
        }
        if (item.children) {
          const found = findFileByPath(item.children, path);
          if (found) return found;
        }
      }
      return null;
    }

    return selectedFile && contentData
      ? findFileByPath(contentData.contentTree, selectedFile)
      : null;
  }, [selectedFile, contentData]);

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
                    <div className="flex items-center gap-2">
                      {contentData?.stats && (
                        <span className="text-muted-foreground text-xs">
                          {contentData.stats.totalFiles} files
                        </span>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          window.open(
                            "https://github.com/funsaized/prompts",
                            "_blank"
                          )
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-96">
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-muted-foreground text-sm">
                          Loading content...
                        </div>
                      </div>
                    ) : error ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-destructive text-sm">
                          Error: {error}
                        </div>
                      </div>
                    ) : (
                      <FileTree
                        data={filteredTree}
                        onSelect={handleFileSelect}
                        selectedPath={selectedFile}
                      />
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Content Display */}
              {selectedFile && selectedFileItem ? (
                <div className="bg-card rounded-lg border">
                  {/* File Header */}
                  <div className="border-border border-b p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-card-foreground text-lg font-semibold">
                          {selectedFileItem.frontmatter?.title ||
                            selectedFileItem.name}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {selectedFile}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedFileItem.tags &&
                          selectedFileItem.tags.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Tag className="text-muted-foreground h-3 w-3" />
                              <div className="flex flex-wrap gap-1">
                                {selectedFileItem.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="bg-primary/10 text-primary rounded-md px-2 py-1 text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        {selectedFileItem.lastModified && (
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Clock className="h-3 w-3" />
                            {new Date(
                              selectedFileItem.lastModified
                            ).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedFileItem.frontmatter?.description && (
                      <p className="text-muted-foreground mt-2 text-sm">
                        {selectedFileItem.frontmatter.description}
                      </p>
                    )}
                  </div>

                  {/* File Content */}
                  <div className="p-6 overflow-hidden">
                    <ContentViewer content={selectedFileContent} />
                  </div>
                </div>
              ) : (
                <div className="bg-card rounded-lg border p-6">
                  <h3 className="text-card-foreground mb-4 text-lg font-semibold capitalize">
                    {activeFilter}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Explore the file tree to see various prompts, agents, and
                    tools.
                  </p>
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="text-foreground mb-2 font-medium">
                      Getting Started
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Click on files in the project explorer to view their
                      content. Use the tabs above to filter by category.
                    </p>
                    {contentData?.stats && (
                      <div className="text-muted-foreground mt-3 flex items-center gap-4 text-sm">
                        <span>{contentData.stats.totalFiles} files</span>
                        <span>{contentData.stats.totalTags} tags</span>
                        <span>
                          {contentData.stats.totalCategories} categories
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
