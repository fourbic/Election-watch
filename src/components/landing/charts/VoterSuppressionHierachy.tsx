import React, { useRef, useEffect } from 'react';
import { Network, DataSet } from 'vis-network/standalone';
//import { useTheme } from './ThemeContext'; // Assuming you have a ThemeContext for dark/light mode

// Define types for nodes and edges
interface MyNode {
  id: string;
  label: string;
  shape: string; // e.g., 'box', 'dot'
  color?: {
    background: string;
    border: string;
    highlight: {
      background: string;
      border: string;
    };
  };
  font?: {
    color: string;
    multi: 'html';
  };
  level?: number; // Used for hierarchical layout
}

interface MyEdge {
  from: string;
  to: string;
  arrows?: 'to' | 'from' | 'to,from' | undefined;
  color?: {
    color: string;
    highlight: string;
  };
  smooth?: {
    enabled: boolean;
    type: string;
  };
}

const VoterSuppressionHierarchy: React.FC = () => {
  const visJsContainer = useRef<HTMLDivElement>(null);
  const networkInstance = useRef<Network | null>(null);
  //const { theme } = useTheme();
const theme="dark"
  // Define node and edge colors based on the image (blue/purple nodes, white text, simple lines)
  const nodeBgColor = '#4a148c'; // Deep purple to match the image
  const nodeBorderColor = '#3a0c6e'; // Darker purple border
  const nodeHighlightBgColor = '#6a1b9a'; // Lighter purple for highlight
  const nodeHighlightBorderColor = '#4a148c'; // Original for highlight border

  const nodeFontColor = theme === 'dark' ? '#E0E0E0' : '#FFFFFF'; // White text on dark nodes
  const edgeColor = theme === 'dark' ? '#94A3B8' : '#64748B'; // Matches other charts

  // Inferred Data from the Image (Voter Suppression Breakdown)
  const initialNodes = new DataSet<MyNode>([
    { id: 'voter-suppression', label: 'Voter\nSuppression', shape: 'box', level: 0 },
    { id: 'jane-doe', label: 'Jane Doe', shape: 'box', level: 1 },
    { id: 'ballot-stuffing', label: 'Ballot\nStuffing', shape: 'box', level: 1 },
    { id: 'voter-rights-buying', label: 'Voter Rights\nBuying', shape: 'box', level: 1 },
    { id: 'voter-rights-denied', label: 'Voter Rights\nDenied', shape: 'box', level: 1 },
    { id: 'voter-harassment', label: 'Voter\nHarassment', shape: 'box', level: 1 },
    { id: 'ballot-issues', label: 'Ballot\nIssues', shape: 'box', level: 1 },
    { id: 'voter-data', label: 'Voter Data', shape: 'box', level: 1 },
    { id: 'voting-rights-laws', label: 'Voting Rights\nLaws', shape: 'box', level: 1 },
    { id: 'election-security', label: 'Election\nSecurity', shape: 'box', level: 1 },
    // Adding a few more inferred sub-branches for visual density if needed
    { id: 'absentee-ballots', label: 'Absentee\nBallots', shape: 'box', level: 2 },
    { id: 'poll-closures', label: 'Poll\nClosures', shape: 'box', level: 2 },
    { id: 'id-requirements', label: 'ID\nRequirements', shape: 'box', level: 2 },
    { id: 'online-disinformation', label: 'Online\nDisinformation', shape: 'box', level: 2 },
  ]);

  const initialEdges = new DataSet<MyEdge>([
    { from: 'voter-suppression', to: 'jane-doe' },
    { from: 'voter-suppression', to: 'ballot-stuffing' },
    { from: 'voter-suppression', to: 'voter-rights-buying' },
    { from: 'voter-suppression', to: 'voter-rights-denied' },
    { from: 'voter-suppression', to: 'voter-harassment' },
    { from: 'voter-suppression', to: 'ballot-issues' },
    { from: 'voter-suppression', to: 'voter-data' },
    { from: 'voter-suppression', to: 'voting-rights-laws' },
    { from: 'voter-suppression', to: 'election-security' },
    // Example sub-branches (not explicitly visible but to create some depth)
    { from: 'ballot-issues', to: 'absentee-ballots' },
    { from: 'voter-rights-denied', to: 'poll-closures' },
    { from: 'voter-rights-denied', to: 'id-requirements' },
    { from: 'voter-harassment', to: 'online-disinformation' },
  ]);

  useEffect(() => {
    if (!visJsContainer.current) return;

    // Apply colors to nodes before creating DataSet for consistent styling
    const nodesWithColors = new DataSet<MyNode>(
      initialNodes.map(node => ({
        ...node,
        color: {
          background: nodeBgColor,
          border: nodeBorderColor,
          highlight: {
            background: nodeHighlightBgColor,
            border: nodeHighlightBorderColor,
          },
        },
        font: {
          color: nodeFontColor,
          multi: 'html', // Ensure multi-line labels work
        },
      }))
    );

    const edgesWithColors = new DataSet<MyEdge>(
      initialEdges.map(edge => ({
        ...edge,
        color: {
          color: edgeColor,
          highlight: edgeColor,
        },
        smooth: {
          enabled: true,
          type: 'horizontal', // Use horizontal for clean hierarchical lines
        },
        arrows: 'to', // Arrows pointing away from parent
      }))
    );

    const data = { nodes: nodesWithColors, edges: edgesWithColors };

    const options = {
      // Hierarchical layout for tree structure
      layout: {
        hierarchical: {
          enabled: true,
          levelSeparation: 150, // Space between levels
          nodeSpacing: 100,    // Space between nodes at the same level
          treeSpacing: 100,    // Space between different trees (if multiple roots)
          direction: 'LR',     // Left to right
          sortMethod: 'hubsize', // Or 'directed', 'custom' if you have specific ordering
          shakeTowards: 'leaves', // Makes the leaves distribute more
        },
      },
      // Disable physics for a static, controlled layout
      physics: false,
      // Disable interaction for a static graph as per your request
      interaction: {
        dragNodes: false,
        zoomView: false,
        dragView: false,
        hover: true, // Keep hover for tooltips if needed
        tooltipDelay: 300,
      },
      nodes: {
        font: {
          color: nodeFontColor, // Default font color, overridden by individual node data
          size: 14,
          face: 'sans-serif',
          multi: 'html', // Allow for \n in labels
        },
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.5)',
          size: 10,
          x: 5,
          y: 5,
        },
        // Shape and color are now set directly on the nodes DataSet
      },
      edges: {
        width: 2,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5,
          },
        },
        color: {
          color: edgeColor, // Default edge color, overridden by individual edge data
          highlight: edgeColor,
        },
        // Smooth and type are set directly on the edges DataSet
      },
      configure: {
        enabled: false, // Disable the configuration UI
      },
    };

    // Destroy existing network instance if it exists
    if (networkInstance.current) {
      networkInstance.current.destroy();
    }

    // Create new network instance
    const network = new Network(visJsContainer.current, data, options);
    networkInstance.current = network;

    // Fit the network to the view after drawing to ensure it's centered and scaled
    network.once('afterDrawing', () => {
      network.fit();
    });

    // Cleanup function
    return () => {
      if (networkInstance.current) {
        networkInstance.current.destroy();
        networkInstance.current = null;
      }
    };
  }, [theme, nodeBgColor, nodeBorderColor, nodeHighlightBgColor, nodeHighlightBorderColor, nodeFontColor, edgeColor]); // Dependencies

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-900 rounded-lg p-4 shadow-lg flex items-center justify-center">
     
      <div
        ref={visJsContainer}
        className="w-full h-full"
        style={{
          border: '1px solid ' + (theme === 'dark' ? '#475569' : '#e2e8f0'), // Slate-600 / Slate-200 border
          borderRadius: '0.375rem', // rounded-md
        }}
      />
    </div>
  );
};

export default VoterSuppressionHierarchy;