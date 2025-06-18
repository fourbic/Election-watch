import React, { useState, useRef, useEffect } from 'react';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  category: 'source' | 'narrative' | 'findings';
  width: number;
  height: number;
}

interface Edge {
  from: string;
  to: string;
}

const HubSpokeNetwork = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  const [nodes, setNodes] = useState<Node[]>([
    // Source node (teal/green)
    { id: 'voter-suppression', label: 'Voter Suppression', x: 200, y: 250, color: '#0D9488', category: 'source', width: 140, height: 40 },
    
    // Findings nodes (blue) - arranged in a fan pattern
    { id: 'jane-doe-1', label: 'Jane Doe', x: 450, y: 120, color: '#2563EB', category: 'findings', width: 90, height: 32 },
    { id: 'ballot-stuffing', label: 'Ballot Stuffing', x: 480, y: 160, color: '#2563EB', category: 'findings', width: 110, height: 32 },
    { id: 'votes-buying-1', label: 'Votes buying', x: 490, y: 200, color: '#2563EB', category: 'findings', width: 100, height: 32 },
    { id: 'voter-rights-denied', label: 'Voter rights denied', x: 500, y: 240, color: '#2563EB', category: 'findings', width: 130, height: 32 },
    { id: 'misinformation', label: 'Misinformation', x: 490, y: 280, color: '#2563EB', category: 'findings', width: 110, height: 32 },
    { id: 'voter-harassment', label: 'Voter harassment', x: 480, y: 320, color: '#2563EB', category: 'findings', width: 120, height: 32 },
    { id: 'votes-buying-2', label: 'Votes buying', x: 470, y: 360, color: '#2563EB', category: 'findings', width: 100, height: 32 },
    { id: 'jane-doe-2', label: 'Jane Doe', x: 450, y: 400, color: '#2563EB', category: 'findings', width: 90, height: 32 }
  ]);

  const edges: Edge[] = [
    { from: 'voter-suppression', to: 'jane-doe-1' },
    { from: 'voter-suppression', to: 'ballot-stuffing' },
    { from: 'voter-suppression', to: 'votes-buying-1' },
    { from: 'voter-suppression', to: 'voter-rights-denied' },
    { from: 'voter-suppression', to: 'misinformation' },
    { from: 'voter-suppression', to: 'voter-harassment' },
    { from: 'voter-suppression', to: 'votes-buying-2' },
    { from: 'voter-suppression', to: 'jane-doe-2' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
          ? { ...node, x: Math.max(70, Math.min(630, newX)), y: Math.max(20, Math.min(480, newY)) }
          : node
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const resetLayout = () => {
    setNodes([
      { id: 'voter-suppression', label: 'Voter Suppression', x: 200, y: 250, color: '#0D9488', category: 'source', width: 140, height: 40 },
      { id: 'jane-doe-1', label: 'Jane Doe', x: 450, y: 120, color: '#2563EB', category: 'findings', width: 90, height: 32 },
      { id: 'ballot-stuffing', label: 'Ballot Stuffing', x: 480, y: 160, color: '#2563EB', category: 'findings', width: 110, height: 32 },
      { id: 'votes-buying-1', label: 'Votes buying', x: 490, y: 200, color: '#2563EB', category: 'findings', width: 100, height: 32 },
      { id: 'voter-rights-denied', label: 'Voter rights denied', x: 500, y: 240, color: '#2563EB', category: 'findings', width: 130, height: 32 },
      { id: 'misinformation', label: 'Misinformation', x: 490, y: 280, color: '#2563EB', category: 'findings', width: 110, height: 32 },
      { id: 'voter-harassment', label: 'Voter harassment', x: 480, y: 320, color: '#2563EB', category: 'findings', width: 120, height: 32 },
      { id: 'votes-buying-2', label: 'Votes buying', x: 470, y: 360, color: '#2563EB', category: 'findings', width: 100, height: 32 },
      { id: 'jane-doe-2', label: 'Jane Doe', x: 450, y: 400, color: '#2563EB', category: 'findings', width: 90, height: 32 }
    ]);
    setSelectedNode(null);
  };

  const createCurvedPath = (from: Node, to: Node) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * 0.3;
    
    return `M ${from.x} ${from.y} Q ${from.x + dx/2 + dr} ${from.y + dy/2 - dr/2} ${to.x} ${to.y}`;
  };

  return (
    <div className="min-h-screens bg-gray-900 p-2 h-64 md:h-80 lg:h-96 overflow-y-hidden  ">
      <div className="max-w-5xl mx-auto ">
        <div className="bg-black   w-full  h-64 md:h-80 lg:h-96 rounded-3xl p-8 border border-gray-800" style={{ backgroundColor: '#0a0a0a' }}>
          <div className="flexy hidden justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Hub & Spoke Network Analysis</h2>
            <button
              onClick={resetLayout}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors duration-200"
            >
              Reset Layout
            </button>
          </div>
          
          <div className="bg-black rounded-2xl p-6 border border-gray-800 relative overflow-hidden">
            <svg
              ref={svgRef}
              width="100%"
              height="200"
              viewBox="0 0 700 500"
              className="cursor-grab active:cursor-grabbing"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Background grid pattern */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1f2937" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
                
                {/* Glow effects */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                
                <filter id="nodeGlow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Animated connection lines */}
              <g className="connections">
                {edges.map((edge, index) => {
                  const fromNode = nodes.find(n => n.id === edge.from);
                  const toNode = nodes.find(n => n.id === edge.to);
                  if (!fromNode || !toNode) return null;

                  const isConnected = selectedNode === edge.from || selectedNode === edge.to;
                  const path = createCurvedPath(fromNode, toNode);
                  
                  return (
                    <g key={index}>
                      {/* Connection line */}
                      <path
                        d={path}
                        fill="none"
                        stroke={isConnected ? '#60A5FA' : '#374151'}
                        strokeWidth={isConnected ? 3 : 2}
                        opacity={isConnected ? 0.9 : 0.6}
                        className="transition-all duration-300"
                        filter={isConnected ? 'url(#glow)' : 'none'}
                      />
                      
                      {/* Animated pulse on lines */}
                      {(selectedNode === 'voter-suppression' || isConnected) && (
                        <circle r="4" fill="#60A5FA" opacity="0.8">
                          <animateMotion dur="2s" repeatCount="indefinite" path={path} />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Nodes */}
              <g className="nodes">
                {nodes.map(node => {
                  const isHovered = hoveredNode === node.id;
                  const isSelected = selectedNode === node.id;
                  const isHub = node.id === 'voter-suppression';
                  const scale = isHovered || isSelected ? 1.05 : 1;
                  
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y}) scale(${scale})`}
                      className="transition-all duration-200 cursor-pointer"
                      onMouseDown={e => handleMouseDown(e, node.id)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(node.id)}
                    >
                      {/* Node shadow */}
                      <rect
                        x={-node.width/2 + 2}
                        y={-node.height/2 + 2}
                        width={node.width}
                        height={node.height}
                        rx={isHub ? 8 : 6}
                        fill="rgba(0,0,0,0.4)"
                      />
                      
                      {/* Node background */}
                      <rect
                        x={-node.width/2}
                        y={-node.height/2}
                        width={node.width}
                        height={node.height}
                        rx={isHub ? 8 : 6}
                        fill={node.color}
                        stroke={isSelected ? '#FFFFFF' : 'transparent'}
                        strokeWidth={2}
                        className="transition-all duration-200"
                        filter={(isHovered || isSelected) ? 'url(#nodeGlow)' : 'none'}
                      />
                      
                      {/* Gradient overlay */}
                      <rect
                        x={-node.width/2}
                        y={-node.height/2}
                        width={node.width}
                        height={node.height}
                        rx={isHub ? 8 : 6}
                        fill="url(#nodeGradient)"
                        opacity={0.3}
                      />
                      
                      {/* Node text */}
                      <text
                        x={0}
                        y={2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white font-semibold pointer-events-none select-none"
                        style={{ fontSize: isHub ? '14px' : '11px' }}
                      >
                        {node.label}
                      </text>
                      
                      {/* Hub pulse animation */}
                      {isHub && selectedNode === node.id && (
                        <rect
                          x={-node.width/2 - 10}
                          y={-node.height/2 - 10}
                          width={node.width + 20}
                          height={node.height + 20}
                          rx={12}
                          fill="none"
                          stroke={node.color}
                          strokeWidth={2}
                          opacity="0.6"
                          className="animate-ping"
                        />
                      )}
                      
                      {/* Connection indicator dot */}
                      {!isHub && (
                        <circle
                          cx={node.width/2 - 8}
                          cy={-node.height/2 + 8}
                          r="3"
                          fill="#9CA3AF"
                          opacity={true ? 1 : 0.5}
                        />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* Gradient definitions */}
              <defs>
                <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Legend */}
          <div className="mt-6 flex justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-teal-600"></div>
              <span className="text-white text-sm">Source</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-600"></div>
              <span className="text-white text-sm">Narrative</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-orange-500"></div>
              <span className="text-white text-sm">Findings</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center text-gray-400 text-sm">
            <p>Click the hub node to see animated connections • Drag nodes to reposition • Hover for glow effects</p>
          </div>

          {/* Selected node info */}
          {selectedNode&& false && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
              <h3 className="text-white font-semibold mb-2">
                {selectedNode === 'voter-suppression' ? 'Hub Node' : 'Connected Node'}
              </h3>
              <p className="text-gray-300">
                {nodes.find(n => n.id === selectedNode)?.label}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Category: {nodes.find(n => n.id === selectedNode)?.category}
                {selectedNode === 'voter-suppression' && ' • Connected to 8 findings'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HubSpokeNetwork;