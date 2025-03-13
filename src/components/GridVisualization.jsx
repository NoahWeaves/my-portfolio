import React, { useEffect, useRef, useState } from 'react';
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
  const cubesRef = useRef([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Grid center coordinates
    const gridCenterX = gridSize.cols / 2;
    const gridCenterZ = gridSize.rows / 2;
    const layerHeight = Math.max(1, layers.length / 2);

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    // Position camera to center directly on the grid
    camera.position.set(
      gridCenterX,                        // Directly above center X
      gridSize.rows * 0.8,                // Increased height for better view of larger blocks
      gridCenterZ - gridSize.rows * 0.5   // Adjusted Z position for better angle with corrected orientation
    );
    camera.lookAt(gridCenterX, layerHeight / 2, gridCenterZ);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add controls - ensure they're centered exactly on the grid
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Set orbit center exactly to grid center
    controls.target.set(gridCenterX, layerHeight / 2, gridCenterZ);
    
    // Disable zooming but allow rotation
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 8; // Slightly higher minimum angle
    controls.maxPolarAngle = Math.PI / 2.5; // Slightly lower maximum angle
    controls.minAzimuthAngle = -Math.PI / 2.5; // Limit horizontal rotation
    controls.maxAzimuthAngle = Math.PI / 2.5; // Limit horizontal rotation
    controlsRef.current = controls;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add grid helper for reference
    const gridHelper = new THREE.GridHelper(
      Math.max(gridSize.cols, gridSize.rows),
      Math.max(gridSize.cols, gridSize.rows),
      0x555555,
      0x333333
    );
    gridHelper.position.set(gridCenterX, 0, gridCenterZ);
    scene.add(gridHelper);

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
    setIsInitialized(true);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      cubesRef.current.forEach(cube => {
        if (cube.geometry) cube.geometry.dispose();
        if (cube.material) cube.material.dispose();
      });
      
      if (renderer) renderer.dispose();
      if (controls) controls.dispose();
    };
  }, [gridSize.cols, gridSize.rows, layers.length]);

  // Update cubes when layers change
  useEffect(() => {
    if (!sceneRef.current || !isInitialized) return;

    // Remove existing cubes
    cubesRef.current.forEach(cube => {
      sceneRef.current.remove(cube);
    });
    cubesRef.current = [];

    // Create cube geometry and material - much larger cubes
    const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8); // Significantly larger cubes
    
    // Add cubes for each active cell in each layer
    layers.forEach((layer, layerIndex) => {
      layer.cells.forEach(({ row, col }) => {
        // Generate a unique color based on the layer
        const hue = (layerIndex / layers.length) * 360;
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(`hsl(${hue}, 80%, 70%)`),
          transparent: false,
          opacity: 1.0,
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cube with y-up orientation and translate to match center coordinates
        // This offset ensures the grid center in the visualization matches the interactive grid
        cube.position.set(
          col,                       // X position
          layerIndex + 0.5,          // Y position (stacked by layer)
          gridSize.rows - 1 - row    // Inverted Z position to match orientation and correct quadrant
        );

        sceneRef.current.add(cube);
        cubesRef.current.push(cube);
      });
    });
  }, [layers, isInitialized]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
    />
  );
};

export default GridVisualization;