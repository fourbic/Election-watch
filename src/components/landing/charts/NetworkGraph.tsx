import React, { useState, useRef, useEffect } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  category: 'source' | 'narrative' | 'findings';
  radius: number;
}

interface Edge {
  from: string;
  to: string;
}

const NetworkGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const [nodes, setNodes] = useState<Node[]>([
    // Source nodes (green)
    { id: 'voter-registration', label: 'Voter Registration Campaign', x: 150, y: 100, color: '#059669', category: 'source', radius: 50 },
    { id: 'source', label: 'Source', x: 150, y: 200, color: '#059669', category: 'source', radius: 40 },
    { id: 'voter-rights', label: 'Voter Rights Campaign', x: 150, y: 300, color: '#059669', category: 'source', radius: 50 },
    
    // Narrative nodes (yellow/orange)
    { id: 'narrative', label: 'Narrative', x: 350, y: 120, color: '#F59E0B', category: 'narrative', radius: 45 },
    { id: 'bias-in-media', label: 'Bias in Media Coverage', x: 350, y: 200, color: '#F59E0B', category: 'narrative', radius: 55 },
    { id: 'election-allegations', label: 'Election Allegations', x: 350, y: 280, color: '#F59E0B', category: 'narrative', radius: 50 },
    
    // Findings nodes (blue)
    { id: 'disinformation', label: 'Disinformation Claims', x: 550, y: 80, color: '#2563EB', category: 'findings', radius: 50 },
    { id: 'findings-strength', label: 'Findings Strength', x: 550, y: 160, color: '#2563EB', category: 'findings', radius: 45 },
    { id: 'election-information', label: 'Election Information', x: 550, y: 240, color: '#2563EB', category: 'findings', radius: 50 }
  ]);

  const edges: Edge[] = [
    { from: 'voter-registration', to: 'narrative' },
    { from: 'source', to: 'narrative' },
    { from: 'source', to: 'bias-in-media' },
    { from: 'voter-rights', to: 'bias-in-media' },
    { from: 'voter-rights', to: 'election-allegations' },
    { from: 'narrative', to: 'disinformation' },
    { from: 'narrative', to: 'findings-strength' },
    { from: 'bias-in-media', to: 'findings-strength' },
    { from: 'bias-in-media', to: 'election-information' },
    { from: 'election-allegations', to: 'election-information' }
  ];

  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setDraggedNode(nodeId);
    setDragOffset({
      x: e.clientX - rect.left - node.x,
      y: e.clientY - rect.top - node.y
    });
    setSelectedNode(nodeId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNode || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;

    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === draggedNode
          ? { ...node, x: Math.max(60, Math.min(640, newX)), y: Math.max(60, Math.min(340, newY)) }
          : node
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const getNodeByPosition = (x: number, y: number): Node | null => {
    return nodes.find(node => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= node.radius;
    }) || null;
  };

  const resetLayout = () => {
    setNodes([
      { id: 'voter-registration', label: 'Voter Registration Campaign', x: 150, y: 100, color: '#059669', category: 'source', radius: 50 },
      { id: 'source', label: 'Source', x: 150, y: 200, color: '#059669', category: 'source', radius: 40 },
      { id: 'voter-rights', label: 'Voter Rights Campaign', x: 150, y: 300, color: '#059669', category: 'source', radius: 50 },
      { id: 'narrative', label: 'Narrative', x: 350, y: 120, color: '#F59E0B', category: 'narrative', radius: 45 },
      { id: 'bias-in-media', label: 'Bias in Media Coverage', x: 350, y: 200, color: '#F59E0B', category: 'narrative', radius: 55 },
      { id: 'election-allegations', label: 'Election Allegations', x: 350, y: 280, color: '#F59E0B', category: 'narrative', radius: 50 },
      { id: 'disinformation', label: 'Disinformation Claims', x: 550, y: 80, color: '#2563EB', category: 'findings', radius: 50 },
      { id: 'findings-strength', label: 'Findings Strength', x: 550, y: 160, color: '#2563EB', category: 'findings', radius: 45 },
      { id: 'election-information', label: 'Election Information', x: 550, y: 240, color: '#2563EB', category: 'findings', radius: 50 }
    ]);
    setSelectedNode(null);
  };

  const formatLabel = (label: string, radius: number) => {
    const maxChars = Math.floor(radius / 3);
    if (label.length <= maxChars) return [label];
    
    const words = label.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    
    words.forEach(word => {
      if ((currentLine + ' ' + word).length <= maxChars) {
        currentLine = currentLine ? currentLine + ' ' + word : word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    
    if (currentLine) lines.push(currentLine);
    return lines.slice(0, 3); // Max 3 lines
  };

  return (
    <div className=" bg-gray-900 p-8 w-full relative h-64 md:h-80 lg:h-96">
      <div className="max-w-4xl mx-auto ">
        <div className="bg-gray-800 rounded-2xl p-6 border  overflow-y-hidden border-gray-700 w-full relative -top-8 h-64 md:h-80 lg:h-96">
          <div className="flexy justify-between items-center mb-6 hidden">
            <h2 className="text-2xl font-bold text-white">Interactive Network Graph</h2>
            <button
              onClick={resetLayout}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
            >
              Reset Layout
            </button>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-4 border border-gray-600">
            <svg
              ref={svgRef}
              width="100%"
              height="200"
              viewBox="0 0 700 400"
              className="cursor-grab active:cursor-grabbing"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Edges */}
              <g className="edges">
                {edges.map((edge, index) => {
                  const fromNode = nodes.find(n => n.id === edge.from);
                  const toNode = nodes.find(n => n.id === edge.to);
                  if (!fromNode || !toNode) return null;

                  const isConnected = selectedNode === edge.from || selectedNode === edge.to;
                  
                  return (
                    <line
                      key={index}
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke={isConnected ? '#60A5FA' : '#4B5563'}
                      strokeWidth={isConnected ? 3 : 2}
                      opacity={isConnected ? 0.8 : 0.4}
                      className="transition-all duration-300"
                    />
                  );
                })}
              </g>

              {/* Nodes */}
              <g className="nodes">
                {nodes.map(node => {
                  const isHovered = hoveredNode === node.id;
                  const isSelected = selectedNode === node.id;
                  const isDragging = draggedNode === node.id;
                  const scale = isHovered || isSelected ? 1.1 : 1;
                  const lines = formatLabel(node.label, node.radius);
                  
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y}) scale(${scale})`}
                      className="transition-transform duration-200 cursor-pointer"
                      onMouseDown={e => handleMouseDown(e, node.id)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(node.id)}
                    >
                      {/* Node shadow */}
                      <circle
                        cx={2}
                        cy={2}
                        r={node.radius}
                        fill="rgba(0,0,0,0.3)"
                        opacity={isHovered ? 0.5 : 0.3}
                      />
                      
                      {/* Node background */}
                      <circle
                        cx={0}
                        cy={0}
                        r={node.radius}
                        fill={node.color}
                        stroke={isSelected ? '#FFFFFF' : 'transparent'}
                        strokeWidth={3}
                        className="transition-all duration-200"
                        filter={isHovered ? 'brightness(1.2)' : 'brightness(1)'}
                      />
                      
                      {/* Node gradient overlay */}
                      <circle
                        cx={0}
                        cy={0}
                        r={node.radius}
                        fill="url(#nodeGradient)"
                        opacity={0.3}
                      />
                      
                      {/* Node text */}
                      <text
                        x={0}
                        y={lines.length === 1 ? 5 : -(lines.length - 1) * 6}
                        textAnchor="middle"
                        className="fill-white font-semibold text-xs pointer-events-none select-none"
                        style={{ fontSize: Math.max(8, node.radius / 6) }}
                      >
                        {lines.map((line, i) => (
                          <tspan key={i} x={0} dy={i === 0 ? 0 : 12}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                      
                      {/* Pulse animation for selected node */}
                      {isSelected && (
                        <circle
                          cx={0}
                          cy={0}
                          r={node.radius + 10}
                          fill="none"
                          stroke={node.color}
                          strokeWidth={2}
                          opacity={0.6}
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Gradient definitions */}
              <defs>
                <radialGradient id="nodeGradient" cx="30%" cy="30%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-6 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
              <span className="text-white text-sm">Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500"></div>
              <span className="text-white text-sm">Narrative</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-600"></div>
              <span className="text-white text-sm">Findings</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center text-gray-400 text-sm">
            <p>Click and drag nodes to reposition • Click nodes to highlight connections • Hover for effects</p>
          </div>

          {/* Selected node info */}
          {selectedNode && (
            <div className="mt-4 p-4 bg-gray-700 rounded-lg border border-gray-600">
              <h3 className="text-white font-semibold mb-2">Selected Node</h3>
              <p className="text-gray-300">
                {nodes.find(n => n.id === selectedNode)?.label}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Category: {nodes.find(n => n.id === selectedNode)?.category}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworkGraph;