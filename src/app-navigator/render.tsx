import React, { FC } from "react";

import type { GetRenderer, LayoutChildren, Route } from "./types";
import type { Navigator } from "../types/navigator";
import DefaultLayout from "./default-layout";

export const getRenderer: GetRenderer = function ({ rootNode, componentsMap }) {
  return () => renderRoot(rootNode);

  function renderRoot(rootNode: Route) {
    if (rootNode.layoutFile) return renderNode(rootNode, null);

    return renderLayout(rootNode, DefaultLayout);
  }

  function renderLayout(node: Route, LayoutComponent: React.FC<any>) {
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
    if (node.layoutFile) {
      return renderNodeAsNavigator(node, Navigator);
    }

    return renderNodeAsScreen(node, Navigator);
  }

  function renderNodeAsNavigator(node: Route, Navigator: Navigator | null) {
    // If node has layoutFile, let's treat this as a "Layout"
    // We can create a new stack or nested navigator
    if (node.layoutFile) {
      // TODO: Lazy load the layout component using require or dynamic import
      const LayoutComponent = componentsMap[node.layoutFile] as FC<{
        children: LayoutChildren;
      }>;

      const Routes = () => (
        <LayoutComponent>
          {({ Navigator }) => {
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

      return Navigator ? (
        <Navigator.Screen name={node.segment} component={Routes} />
      ) : (
        <Routes />
      );
    }

    // If we reach here, maybe it’s a node with no layout and no page
    // (e.g., an empty folder).
    return null;
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
