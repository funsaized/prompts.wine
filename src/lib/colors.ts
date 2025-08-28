/**
 * Color system for content type visualization
 */

export type ContentType = "agents" | "prompts" | "commands" | "instructions";

// Define colors for each content type with RGB values for blending
export const CONTENT_COLORS: Record<
  ContentType,
  { hex: string; rgb: [number, number, number]; name: string }
> = {
  agents: {
    hex: "#3b82f6", // blue
    rgb: [59, 130, 246],
    name: "blue",
  },
  prompts: {
    hex: "#eab308", // yellow
    rgb: [234, 179, 8],
    name: "yellow",
  },
  commands: {
    hex: "#10b981", // emerald/green
    rgb: [16, 185, 129],
    name: "emerald",
  },
  instructions: {
    hex: "#8b5cf6", // purple/violet
    rgb: [139, 92, 246],
    name: "violet",
  },
};

/**
 * Get the primary content type from tags array
 */
export function getPrimaryContentType(tags: string[]): ContentType | null {
  const contentTypes: ContentType[] = [
    "agents",
    "prompts",
    "commands",
    "instructions",
  ];

  for (const type of contentTypes) {
    if (tags.includes(type)) {
      return type;
    }
  }
  return null;
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

/**
 * Blend multiple colors based on weights
 * @param colors Array of [contentType, weight] pairs
 * @returns Blended color in hex format
 */
export function blendColors(colors: Array<[ContentType, number]>): string {
  if (colors.length === 0) return "transparent";
  if (colors.length === 1) return CONTENT_COLORS[colors[0][0]].hex;

  // Calculate total weight
  const totalWeight = colors.reduce((sum, [, weight]) => sum + weight, 0);
  if (totalWeight === 0) return "transparent";

  // Weighted average of RGB components
  let r = 0,
    g = 0,
    b = 0;

  for (const [type, weight] of colors) {
    const color = CONTENT_COLORS[type];
    const normalizedWeight = weight / totalWeight;
    r += color.rgb[0] * normalizedWeight;
    g += color.rgb[1] * normalizedWeight;
    b += color.rgb[2] * normalizedWeight;
  }

  return rgbToHex(r, g, b);
}

/**
 * Create a gradient background from multiple colors with reduced opacity
 */
export function createGradientBackground(
  colors: Array<[ContentType, number]>
): string {
  if (colors.length === 0) return "transparent";
  if (colors.length === 1) {
    return getContentTypeBackground(colors[0][0], 0.1);
  }

  // Calculate total weight
  const totalWeight = colors.reduce((sum, [, weight]) => sum + weight, 0);
  if (totalWeight === 0) return "transparent";

  // Create gradient stops with reduced opacity
  const stops: string[] = [];
  let currentPosition = 0;

  for (const [type, weight] of colors) {
    const percentage = (weight / totalWeight) * 100;
    const color = CONTENT_COLORS[type];
    const rgbaColor = `rgba(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]}, 0.1)`;

    if (stops.length === 0) {
      stops.push(`${rgbaColor} 0%`);
    }

    currentPosition += percentage;
    stops.push(`${rgbaColor} ${currentPosition}%`);
  }

  return `linear-gradient(90deg, ${stops.join(", ")})`;
}

/**
 * Get CSS class for content type color
 */
export function getContentTypeColorClass(type: ContentType): string {
  const colorMap: Record<ContentType, string> = {
    agents: "text-blue-500",
    prompts: "text-yellow-500",
    commands: "text-emerald-500",
    instructions: "text-violet-500",
  };

  return colorMap[type] || "";
}

/**
 * Get background color with opacity for a content type
 */
export function getContentTypeBackground(
  type: ContentType | null,
  opacity: number = 0.1
): string {
  if (!type) return "transparent";
  const color = CONTENT_COLORS[type];
  return `rgba(${color.rgb[0]}, ${color.rgb[1]}, ${color.rgb[2]}, ${opacity})`;
}
