import React, { FC } from "react";

import type { GetRenderer, LayoutChildren, LayoutProps, Route } from "./types";
import type { Navigator } from "../types/navigator";
import DefaultLayout from "./default-layout";

export const getRenderer: GetRenderer = function ({ rootNode, componentsMap }) {
  return () => renderRoot(rootNode);

  function renderRoot(rootNode: Route) {
    if (rootNode.layoutFile) return renderNode(rootNode, null);

    return renderLayout(rootNode, DefaultLayout);
  }

  function renderLayout(
    node: Route,
    LayoutComponent: React.FC<LayoutProps<unknown>>,
  ) {
    return (
      <LayoutComponent>
        {({ Navigator }: { Navigator: Navigator }) => {
          return (
            <>
              {renderNodeAsScreen(node, Navigator)}
              {/* Render child routes (which might be pages or more layouts) */}
              {node.children.map((child) => (
                <React.Fragment key={child.segment}>
                  {renderNode(child, Navigator)}
                </React.Fragment>
              ))}
            </>
          );
        }}
      </LayoutComponent>
    );
  }

  function renderNode(node: Route, Navigator: Navigator | null) {
    if (!!node.layoutFile || !!node.children.length) {
      return renderNodeAsNavigator(node, Navigator);
    }

    if (node.screenFile) return renderNodeAsScreen(node, Navigator);

    return null;
  }

  function renderNodeAsNavigator(node: Route, Navigator: Navigator | null) {
    // TODO: Lazy load the layout component using require or dynamic import
    const LayoutComponent = (componentsMap[node.layoutFile!] ??
      DefaultLayout) as FC<{
      children: LayoutChildren;
    }>;

    const Routes = () => (
      <LayoutComponent>
        {({ Navigator }) => {
          return (
            <>
              {node.screenFile && renderNodeAsScreen(node, Navigator)}
              {/* Render child routes (which might be pages or more layouts) */}
              {node.children.map((child) => (
                <React.Fragment key={child.segment}>
                  {renderNode(child, Navigator)}
                </React.Fragment>
              ))}
            </>
          );
        }}
      </LayoutComponent>
    );

    return Navigator ? (
      <Navigator.Screen name={node.segment} component={Routes} />
    ) : (
      <Routes />
    );
  }

  function renderNodeAsScreen(node: Route, Navigator: Navigator | null) {
    if (!Navigator) return null;

    return (
      <Navigator.Screen
        name={node.segment}
        component={componentsMap[node.screenFile]}
      />
    );
  }
};
