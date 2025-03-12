import React, { useState } from 'react';
import InteractiveGrid from './InteractiveGrid';
import GridVisualization from './GridVisualization';

const InteractiveLayers = () => {
  const [layers, setLayers] = useState([
    { id: 0, cells: [] },  // Hero section
    { id: 1, cells: [] },  // About section
    { id: 2, cells: [] }   // Projects section
  ]);

  const handleLayerUpdate = ({ layerId, cells }) => {
    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId 
          ? { ...layer, cells } 
          : layer
      )
    );
  };

  return (
    <div>
      {/* Interactive grid sections */}
      {layers.map(layer => (
        <section key={layer.id} className="mb-16">
          <InteractiveGrid
            layerId={layer.id}
            onCellUpdate={handleLayerUpdate}
            className="max-w-6xl mx-auto"
          />
        </section>
      ))}

      {/* 3D Visualization */}
      <section className="fixed bottom-8 right-8 w-96 h-96 bg-black rounded-lg shadow-lg overflow-hidden">
        <GridVisualization layers={layers} />
      </section>
    </div>
  );
};

export default InteractiveLayers;