import type { ComponentType } from 'react';

export interface ToolConfig {
  header: ComponentType;
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