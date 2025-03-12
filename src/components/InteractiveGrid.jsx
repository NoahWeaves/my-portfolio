import React, { useState, useRef, useEffect } from 'react';

const InteractiveGrid = ({ 
  gridSize = { cols: 30, rows: 20 },
  layerId = 0,
  onCellUpdate = () => {},
  className = ""
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [activeCells, setActiveCells] = useState(new Set());
  const containerRef = useRef(null);
  
  const maxTiltAngle = 20;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tiltX = (0.5 - mousePos.y) * maxTiltAngle * 2;
  const tiltY = (mousePos.x - 0.5) * maxTiltAngle * 2;

  const handleCellClick = (row, col) => {
    const cellKey = `${row}-${col}`;
    setActiveCells(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cellKey)) {
        newSet.delete(cellKey);
      } else {
        newSet.add(cellKey);
      }
      
      onCellUpdate({
        layerId,
        cells: Array.from(newSet).map(key => {
          const [row, col] = key.split('-').map(Number);
          return { row, col };
        })
      });
      
      return newSet;
    });
  };

  // Create an array of cell positions
  const cells = [];
  for (let row = 0; row < gridSize.rows; row++) {
    for (let col = 0; col < gridSize.cols; col++) {
      const x = (col / gridSize.cols) * 100;
      const y = (row / gridSize.rows) * 100;
      const width = 100 / gridSize.cols;
      const height = 100 / gridSize.rows;
      const isActive = activeCells.has(`${row}-${col}`);
      
      cells.push({ row, col, x, y, width, height, isActive });
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-screen overflow-hidden bg-black ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="absolute transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
          top: '-25%',
          left: '-25%',
          right: '-25%',
          bottom: '-25%',
          width: '150%',
          height: '150%'
        }}
      >
        <svg 
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'translateZ(0px)' }}
        >
          {/* Render cells as SVG rectangles */}
          {cells.map(({ row, col, x, y, width, height, isActive }) => (
            <rect
              key={`${row}-${col}`}
              x={`${x}%`}
              y={`${y}%`}
              width={`${width}%`}
              height={`${height}%`}
              className={`
                cursor-pointer transition-all duration-200
                ${isActive ? 'fill-slate-200/40' : 'fill-transparent hover:fill-slate-200/20'}
                stroke-slate-200/20
              `}
              onClick={() => handleCellClick(row, col)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default InteractiveGrid;