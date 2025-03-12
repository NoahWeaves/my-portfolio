import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const GridVisualization = ({ 
  layers = [], 
  gridSize = { cols: 30, rows: 20 },
  className = "" 
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(gridSize.cols / 2, layers.length * 2, gridSize.rows * 1.5);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update cubes when layers change
  useEffect(() => {
    if (!sceneRef.current) return;

    // Clear existing cubes
    sceneRef.current.children = sceneRef.current.children.filter(
      child => !(child instanceof THREE.Mesh)
    );

    // Create cube geometry and material
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.7,
    });

    // Add cubes for each active cell in each layer
    layers.forEach((layer, layerIndex) => {
      layer.cells.forEach(({ row, col }) => {
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cube
        cube.position.set(
          col - gridSize.cols / 2,  // Center the grid on X
          layerIndex * 1.2,         // Stack layers with slight spacing
          row - gridSize.rows / 2    // Center the grid on Z
        );

        sceneRef.current.add(cube);
      });
    });
  }, [layers, gridSize]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-96 ${className}`}
    />
  );
};

export default GridVisualization;