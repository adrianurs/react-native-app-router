import importsMap from "../../output/imports";

import type { FC, ReactNode } from "react";
import type { Navigator } from "../types/navigator";

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

export interface LayoutChildrenParams {
  Navigator: Navigator;
}

export type LayoutChildren<K extends unknown = unknown> = (
  layoutChildrenParams: LayoutChildrenParams & K,
) => ReactNode;

export type LayoutProps<K extends unknown = unknown> = {
  children: LayoutChildren;
} & K;

type Renderer = () => ReactNode;

type GetRendererParams = {
  rootNode: Route;
  componentsMap: Record<ImportKey, FC>;
};

export type GetRenderer = (props: GetRendererParams) => Renderer;
