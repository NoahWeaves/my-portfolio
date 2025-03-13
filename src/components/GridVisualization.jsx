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

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );

    // Position camera closer to view the grid
    const maxDimension = Math.max(gridSize.cols, gridSize.rows);
    camera.position.set(
      gridSize.cols / 2, 
      maxDimension / 3 + layers.length / 2,  // Lower height
      maxDimension * 0.8                    // Closer distance from grid
    );
    camera.lookAt(gridSize.cols / 2, layers.length / 2, gridSize.rows / 2);
    cameraRef.current = camera;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(gridSize.cols / 2, layers.length / 3, gridSize.rows / 2); // Lower target point
    
    // Set control limits to keep the view reasonable
    controls.minDistance = 5;
    controls.maxDistance = maxDimension * 1.5;
    controls.maxPolarAngle = Math.PI / 1.5; // Limit how far below the grid you can orbit
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
    gridHelper.position.set(gridSize.cols / 2, 0, gridSize.rows / 2);
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
  }, [gridSize.cols, gridSize.rows]);

  // Update cubes when layers change
  useEffect(() => {
    if (!sceneRef.current || !isInitialized) return;

    // Remove existing cubes
    cubesRef.current.forEach(cube => {
      sceneRef.current.remove(cube);
    });
    cubesRef.current = [];

    // Create cube geometry and material - larger cubes
    const geometry = new THREE.BoxGeometry(0.95, 0.95, 0.95); // Larger cubes with smaller gaps
    
    // Add cubes for each active cell in each layer
    layers.forEach((layer, layerIndex) => {
      layer.cells.forEach(({ row, col }) => {
        // Generate a unique color based on the layer
        const hue = (layerIndex / layers.length) * 360;
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(`hsl(${hue}, 80%, 70%)`),
          transparent: true,
          opacity: 0.8,
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cube with y-up orientation
        cube.position.set(
          col,                  // X position
          layerIndex + 0.5,     // Y position (stacked by layer)
          row                   // Z position
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