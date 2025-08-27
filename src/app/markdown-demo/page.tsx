"use client";

import * as React from "react";
import { MarkdownViewer } from "@/components/ui/markdown-viewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const sampleMarkdown = `# Welcome to MarkdownViewer

This is a **comprehensive markdown viewer** component built with React and TypeScript, featuring syntax highlighting and beautiful styling.

## Features

### 🎨 Syntax Highlighting

Code blocks support syntax highlighting for multiple languages:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}
\`\`\`

\`\`\`python
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]

    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    return sequence

# Example usage
print(fibonacci(10))
\`\`\`

### 📋 Tables

Tables are responsive and styled beautifully:

| Feature | Description | Status |
|---------|-------------|--------|
| Syntax Highlighting | Highlights code in multiple languages | ✅ Complete |
| Copy Button | One-click code copying | ✅ Complete |
| Responsive Tables | Horizontal scroll on mobile | ✅ Complete |
| Anchor Links | Navigate to headers | ✅ Complete |
| Dark Mode | Automatic dark mode support | ✅ Complete |

### 💬 Blockquotes

> "The best way to predict the future is to invent it."
>
> — Alan Kay

Blockquotes are styled distinctly with a left border and subtle background color for better visibility.

### 📝 Lists

#### Unordered Lists
- First level item
  - Second level item
    - Third level item
  - Another second level
- Back to first level

#### Ordered Lists
1. Step one: Install dependencies
2. Step two: Import the component
3. Step three: Pass your markdown content
   1. Sub-step A
   2. Sub-step B
4. Step four: Customize styling

### 🔗 Links

Links are automatically styled and external links open in new tabs: [Visit GitHub](https://github.com).

Internal links work with smooth scrolling to [Features](#features) section.

### 📸 Images

Images are responsive and centered with beautiful styling:

![Placeholder](https://via.placeholder.com/600x300/3B82F6/FFFFFF?text=Beautiful+Image)

### ⚡ Inline Code

You can use inline code like \`const name = "John"\` within paragraphs for better readability.

### --- Horizontal Rules ---

---

Horizontal rules create visual separation between sections.

## Advanced Examples

### Mixed Content

Here's a paragraph with **bold text**, *italic text*, and \`inline code\`. You can also use ~~strikethrough~~ text if needed.

### Nested Structures

1. **First item** with some code:
   \`\`\`javascript
   console.log("Hello, World!");
   \`\`\`
2. *Second item* with a blockquote:
   > Nested quote within a list item
3. Third item with a table:

   | Column A | Column B |
   |----------|----------|
   | Data 1   | Data 2   |

## Conclusion

This MarkdownViewer component provides all the essential features for displaying markdown content beautifully with optimal readability and user experience.
`;

const shortMarkdown = `# Quick Example

This is a shorter example showing basic markdown rendering with **bold**, *italic*, and [links](https://example.com).

\`\`\`javascript
console.log("Hello, World!");
\`\`\`
`;

const usageExample = `\`\`\`tsx
import { MarkdownViewer } from "@/components/ui/markdown-viewer";

export function MyComponent() {
  const markdownContent = "# Hello World\\n\\nThis is **markdown** content.";

  return (
    <MarkdownViewer
      content={markdownContent}
      loading={false}
      error={null}
      className="my-custom-class"
    />
  );
}
\`\`\``;

export default function MarkdownDemoPage() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const simulateLoading = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const simulateError = () => {
    setLoading(false);
    setError("Failed to load markdown content. Please try again.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">MarkdownViewer Demo</h1>
        <p className="text-muted-foreground">
          A comprehensive markdown viewer with syntax highlighting, copy
          buttons, and beautiful styling.
        </p>
      </div>

      <div className="mb-6 flex gap-4">
        <Button onClick={simulateLoading}>Simulate Loading</Button>
        <Button variant="destructive" onClick={simulateError}>
          Simulate Error
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setLoading(false);
            setError(null);
          }}
        >
          Reset
        </Button>
      </div>

      <Tabs defaultValue="full" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="full">Full Example</TabsTrigger>
          <TabsTrigger value="short">Short Example</TabsTrigger>
          <TabsTrigger value="states">Loading/Error States</TabsTrigger>
        </TabsList>

        <TabsContent value="full">
          <Card>
            <CardHeader>
              <CardTitle>Full Featured Example</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownViewer content={sampleMarkdown} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="short">
          <Card>
            <CardHeader>
              <CardTitle>Simple Example</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownViewer content={shortMarkdown} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="states">
          <Card>
            <CardHeader>
              <CardTitle>Component States</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownViewer
                content={sampleMarkdown}
                loading={loading}
                error={error}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Usage Example</CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownViewer content={usageExample} />
        </CardContent>
      </Card>
    </div>
  );
}
