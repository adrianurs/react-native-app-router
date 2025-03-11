import React from "react";
import DefaultLayout from "./default-layout";
export const getRenderer = function ({ rootNode, componentsMap }) {
  return () => renderRoot(rootNode);
  function renderRoot(rootNode) {
    if (rootNode.layoutFile) return renderNode(rootNode, null);
    return renderLayout(rootNode, DefaultLayout);
  }
  function renderLayout(node, LayoutComponent) {
    return (
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
  }
  function renderNode(node, Navigator) {
    if (node.layoutFile) {
      return renderNodeAsNavigator(node, Navigator);
    }
    return renderNodeAsScreen(node, Navigator);
  }
  function renderNodeAsNavigator(node, Navigator) {
    // If node has layoutFile, let's treat this as a "Layout"
    // We can create a new stack or nested navigator
    if (node.layoutFile) {
      // TODO: Lazy load the layout component using require or dynamic import
      const LayoutComponent = componentsMap[node.layoutFile];
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
  function renderNodeAsScreen(node, Navigator) {
    if (!Navigator) return null;
    return (
      <Navigator.Screen
        name={node.segment}
        component={componentsMap[node.screenFile]}
      />
    );
  }
};
