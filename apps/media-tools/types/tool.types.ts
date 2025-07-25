import type { ComponentType } from 'react';

export interface ToolConfig {
  controls: ComponentType;
  panel: ComponentType;
}

export interface Tool {
  slug: string;
  title: string;
  description: string;
}

export interface ToolPageProps {
  params: { tool: string };
}