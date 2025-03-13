import React, { useState, useRef, useEffect } from 'react';

const InteractiveGrid = ({ 
  gridSize = { cols: 30, rows: 20 },
  layerId = 0,
  onCellUpdate = () => {},
  className = ""
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [activeCells, setActiveCells] = useState(new Set());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  
  const maxTiltAngle = 15; // Reduced tilt angle for a closer view

  // Calculate cell size based on the smaller dimension to ensure square cells
  // Using a scaling factor of 1.2 to make cells larger than the default size
  const cellSize = Math.min(
    dimensions.width / gridSize.cols,
    dimensions.height / gridSize.rows
  ) * 1.2;

  // Calculate the grid's actual width and height based on cell size
  const gridWidth = cellSize * gridSize.cols;
  const gridHeight = cellSize * gridSize.rows;

  // Calculate centering offsets
  const offsetX = (dimensions.width - gridWidth) / 2;
  const offsetY = (dimensions.height - gridHeight) / 2;

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    // Initialize dimensions
    updateDimensions();
    
    // Update dimensions on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

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
      const x = offsetX + col * cellSize;
      const y = offsetY + row * cellSize;
      const isActive = activeCells.has(`${row}-${col}`);
      
      cells.push({ row, col, x, y, size: cellSize, isActive });
    }
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="absolute -inset-10 transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        <svg 
          className="absolute inset-0 w-full h-full"
          style={{ transform: 'translateZ(0px)' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Render cells as SVG rectangles */}
          {cells.map(({ row, col, x, y, size, isActive }) => (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width={size}
              height={size}
              className={`
                cursor-pointer transition-all duration-200
                ${isActive ? 'fill-slate-200/40' : 'fill-transparent hover:fill-slate-200/20'}
                stroke-slate-200/20
              `}
              onClick={() => handleCellClick(row, col)}
            />
          ))}
          
          {/* X-Axis indicator */}
          <line 
            x1={offsetX} 
            y1={offsetY + gridHeight/2} 
            x2={offsetX + gridWidth} 
            y2={offsetY + gridHeight/2} 
            stroke="red" 
            strokeWidth="2" 
          />
          
          {/* Y-Axis indicator */}
          <line 
            x1={offsetX + gridWidth/2} 
            y1={offsetY} 
            x2={offsetX + gridWidth/2} 
            y2={offsetY + gridHeight} 
            stroke="green" 
            strokeWidth="2" 
          />
          
          {/* Center point marker */}
          <circle 
            cx={offsetX + gridWidth/2} 
            cy={offsetY + gridHeight/2} 
            r={cellSize/2} 
            fill="yellow" 
          />
        </svg>
      </div>
      
      {/* Coordinate system legend */}
      <div className="absolute bottom-2 right-2 bg-black/70 p-2 text-xs text-white z-10 rounded">
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-red-500 mr-1"></div>
          <span>X-Axis</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 bg-green-500 mr-1"></div>
          <span>Y-Axis</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 mr-1"></div>
          <span>Center</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveGrid;