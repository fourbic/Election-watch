import React, { useRef, useEffect } from 'react';
import { Network, DataSet } from 'vis-network/standalone';
//import { useTheme } from './ThemeContext'; // Assuming you have a ThemeContext for dark/light mode

// Define types for nodes and edges
interface MyNode {
  id: string;
  label: string;
  group: 'source' | 'narrative' | 'finding';
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
  };
}

interface MyEdge {
  from: string;
  to: string;
  arrows?: 'to' | 'from' | 'to,from' | undefined;
  color?: {
    color: string;
    highlight: string;
  };
}

const NetworkGraph: React.FC = () => {
  const visJsContainer = useRef<HTMLDivElement>(null);
  const networkInstance = useRef<Network | null>(null); // To store the network instance
  //const { theme } = useTheme(); // For dynamic theme colors
const theme="dark"
  // Define colors based on the IMAGE'S BACKGROUND COLORS of the circles
  const nodeColors = {
    source: { // Dark Green/Teal from image
      background: '#0F6B6B', // A dark teal/forest green
      border: '#0A4D4D',    // A darker border
      highlight: { background: '#148C8C', border: '#0F6B6B' }, // Slightly lighter for highlight
    },
    narrative: { // Muted Gold/Dark Yellow from image
      background: '#A6822E', // A muted gold/dark yellow
      border: '#7A6022',    // A darker border
      highlight: { background: '#D4A83B', border: '#A6822E' }, // Slightly lighter for highlight
    },
    finding: { // Dark Blue from image
      background: '#2B5791', // A deep, dark blue
      // The border in the image looks almost the same as background, or slightly darker.
      border: '#1E3E67',    // A darker border
      highlight: { background: '#3D72BD', border: '#2B5791' }, // Slightly lighter for highlight
    },
  };

  // Adjust edge and text color for contrast on the dark background
  const edgeColor = theme === 'dark' ? '#94A3B8' : '#64748B'; // slate-400 / slate-600
  const nodeFontColor = theme === 'dark' ? '#E2E8F0' : '#475569'; // slate-200 / slate-600 (lighter text for dark nodes)


  // --- Data ---
  // Ensure nodes and edges are outside useEffect or memoized if they don't change often
  // Re-instantiating DataSet is okay if the raw data changes, but if just options,
  // we might update via setOptions on the network instance.
  // For this static graph, define them once.
  const initialNodes = new DataSet<MyNode>([
    { id: 'source-voter-rights-campaign', label: 'Voter Rights\nCampaign', group: 'source' },
    { id: 'source-narrative-2', label: 'Source', group: 'source' },
    { id: 'source-narrative-3', label: 'Voter Rights\nCampaign', group: 'source' },
    { id: 'source-other', label: 'Source', group: 'source' },
    { id: 'narrative-general', label: 'Narrative', group: 'narrative' },
    { id: 'narrative-in-media-reporting', label: 'In Media\nReporting', group: 'narrative' },
    { id: 'narrative-other', label: 'Narrative', group: 'narrative' },
    { id: 'finding-debunked-claims', label: 'Debunked\nClaims', group: 'finding' },
    { id: 'finding-election-fraud', label: 'Election Fraud\n& Irregularities', group: 'finding' },
    { id: 'finding-general', label: 'Findings', group: 'finding' },
    { id: 'finding-election-narratives', label: 'Election\nNarratives', group: 'finding' },
  ]);

  const initialEdges = new DataSet<MyEdge>([
    { from: 'source-voter-rights-campaign', to: 'narrative-general' },
    { from: 'narrative-general', to: 'finding-debunked-claims' },
    { from: 'source-narrative-3', to: 'narrative-in-media-reporting' },
    { from: 'narrative-in-media-reporting', to: 'finding-election-fraud' },
    { from: 'narrative-other', to: 'finding-general' },
    { from: 'narrative-general', to: 'finding-general' },
    { from: 'source-narrative-2', to: 'narrative-other' },
    { from: 'source-other', to: 'narrative-other' },
    { from: 'narrative-in-media-reporting', to: 'finding-election-narratives' },
    { from: 'narrative-other', to: 'finding-election-narratives' },
  ]);

  // --- Effect Hook for Network Initialization and Updates ---
  useEffect(() => {
    if (!visJsContainer.current) return;

    // Define options (this will be recreated if dependencies change)
    const options = {
      // Completely disable physics for a static graph
      physics: false,
      layout: {
        improvedLayout: true,
        randomSeed: 2, // Fixed seed for consistent layout
      },
      interaction: {
        dragNodes: false, // Disable node dragging
        zoomView: false,  // Disable zooming
        dragView: false,  // Disable panning/dragging the view
        hover: true,      // Keep hover effects
        tooltipDelay: 300,
      },
      nodes: {
        shape: 'dot',
        size: 25,
        font: {
          color: nodeFontColor,
          size: 14,
          face: 'sans-serif',
          multi: 'html',
        },
        borderWidth: 2,
        shadow: {
          enabled: true,
          color: 'rgba(0,0,0,0.5)',
          size: 10,
          x: 5,
          y: 5,
        },
      },
      edges: {
        width: 2,
        smooth: {
          enabled: true,
          type: 'continuous',
        },
        color: {
          inherit: 'from',
          color: edgeColor,
          highlight: edgeColor,
        },
      },
      // Groups will apply the correct colors and override default node font
      groups: {
        source: { ...nodeColors.source, font: { color: nodeFontColor } },
        narrative: { ...nodeColors.narrative, font: { color: nodeFontColor } },
        finding: { ...nodeColors.finding, font: { color: nodeFontColor } },
      },
      configure: {
          enabled: false,
      }
    };

    // Prepare data with dynamic colors
    const nodesWithColors = new DataSet<MyNode>(
        initialNodes.map(node => ({
            ...node,
            ...(nodeColors[node.group]) // Apply colors based on group
        }))
    );
    const edgesWithColors = new DataSet<MyEdge>(
        initialEdges.map(edge => ({
            ...edge,
            color: { color: edgeColor, highlight: edgeColor } // Apply edge color
        }))
    );

    const data = { nodes: nodesWithColors, edges: edgesWithColors };

    // If network instance exists, destroy it to re-create with new options
    if (networkInstance.current) {
        networkInstance.current.destroy();
    }

    // Create a new network instance
    const network = new Network(visJsContainer.current, data, options);
    networkInstance.current = network; // Store the instance

    // Adjust position after initial layout if you want it centered/fixed
    // You might need to experiment with this based on your desired look
    network.once('afterDrawing', () => {
        network.fit(); // Fits the graph to the canvas
        // network.moveTo({ position: { x: 0, y: 0 }, scale: 1 }); // Or a specific position/zoom
    });


    // Cleanup function
    return () => {
      if (networkInstance.current) {
        networkInstance.current.destroy();
        networkInstance.current = null;
      }
    };
  }, [theme, edgeColor, nodeFontColor, nodeColors]); // Dependencies for re-rendering the network

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-900 rounded-lg p-4 shadow-lg flex items-center justify-center">
      <div
        ref={visJsContainer}
        className="w-full h-full"
        style={{
          border: '1px solid ' + (theme === 'dark' ? '#475569' : '#e2e8f0'),
          borderRadius: '0.375rem',
        }}
      />
    </div>
  );
};

export default NetworkGraph;