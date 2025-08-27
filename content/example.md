# Example Content

This is an example markdown file in the content directory. You can use this directory to store markdown files for blog posts, documentation, or other content that can be processed by Next.js.

## Features

- **Markdown Processing**: Perfect for blog posts and documentation
- **Static Generation**: Content can be statically generated at build time
- **Type Safety**: Use TypeScript for content processing utilities

## Usage

```typescript
// Example of how you might process content files
import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export function getContentFiles() {
  return fs.readdirSync(contentDirectory);
}
```

This directory structure supports various content management patterns and can be easily extended for your needs.
