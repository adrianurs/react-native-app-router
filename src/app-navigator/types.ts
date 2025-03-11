import { FC, ReactNode } from "react";
import importsMap from "../../output/imports";

export type ImportKey = keyof typeof importsMap;

/**
 * Represents a single route in the tree.
 */
export interface Route {
  segment: string;
  layoutFile: ImportKey | null;
  screenFile: ImportKey;
  children: Route[];
  route: string;
}

export type LayoutChildren = (layoutParams: any) => ReactNode;

type Renderer = () => ReactNode;

type GetRendererParams = {
  rootNode: Route;
  componentsMap: Record<ImportKey, FC>;
};

export type GetRenderer = (props: GetRendererParams) => Renderer;
