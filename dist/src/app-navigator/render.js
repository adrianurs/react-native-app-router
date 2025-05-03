import React from "react";
import DefaultLayout from "./default-layout";
export const getRenderer = function ({ rootNode, componentsMap }) {
    return () => renderRoot(rootNode);
    function renderRoot(rootNode) {
        if (rootNode.layoutFile)
            return renderNode(rootNode, null);
        return renderLayout(rootNode, DefaultLayout);
    }
    function renderLayout(node, LayoutComponent) {
        return (<LayoutComponent>
        {({ Navigator }) => {
                return (<>
              {renderNodeAsScreen(node, Navigator)}
              {/* Render child routes (which might be pages or more layouts) */}
              {node.children.map((child) => (<React.Fragment key={child.segment}>
                  {renderNode(child, Navigator)}
                </React.Fragment>))}
            </>);
            }}
      </LayoutComponent>);
    }
    function renderNode(node, Navigator) {
        if (!!node.layoutFile || !!node.children.length) {
            return renderNodeAsNavigator(node, Navigator);
        }
        if (node.screenFile)
            return renderNodeAsScreen(node, Navigator);
        return null;
    }
    function renderNodeAsNavigator(node, Navigator) {
        // TODO: Lazy load the layout component using require or dynamic import
        const LayoutComponent = (componentsMap[node.layoutFile] ?? DefaultLayout);
        const Routes = () => (<LayoutComponent>
          {({ Navigator }) => {
                return (<>
                {node.screenFile && renderNodeAsScreen(node, Navigator)}
                {/* Render child routes (which might be pages or more layouts) */}
                {node.children.map((child) => (<React.Fragment key={child.segment}>
                    {renderNode(child, Navigator)}
                  </React.Fragment>))}
              </>);
            }}
        </LayoutComponent>);
        return Navigator ? (<Navigator.Screen name={node.segment} component={Routes}/>) : (<Routes />);
    }
    function renderNodeAsScreen(node, Navigator) {
        if (!Navigator)
            return null;
        return (<Navigator.Screen name={node.segment} component={componentsMap[node.screenFile]}/>);
    }
};
