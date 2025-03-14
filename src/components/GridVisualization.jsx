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
      gridCenterZ + gridSize.rows * 0.5   // Adjusted Z position for better angle with corrected orientation
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add a secondary directional light from opposite side for more even lighting
    const secondaryLight = new THREE.DirectionalLight(0xffffff, 0.5);
    secondaryLight.position.set(-10, 5, -10);
    scene.add(secondaryLight);

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

    // Create even larger cubes
    const scalingFactor = 1;
    const cubeSize = 1.0 * scalingFactor; // Large cube size
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    
    // Half the cube dimension for offset
    const halfCube = cubeSize / 2;
    
    // Add cubes for each active cell in each layer
    layers.forEach((layer, layerIndex) => {
      layer.cells.forEach(({ row, col }) => {
        // Generate a unique color based on the layer
        const hue = (layerIndex / Math.max(1, layers.length - 1)) * 360;
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(`hsl(${hue}, 80%, 70%)`),
          transparent: false, // Fully opaque cubes
          specular: 0x111111,
          shininess: 30
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cube with offset in all three dimensions
        cube.position.set(
          col * scalingFactor + halfCube,  // X position with scaling
          halfCube + layerIndex * cubeSize, // Y position (height)
          row * scalingFactor + halfCube    // Z position with scaling
        );

        sceneRef.current.add(cube);
        cubesRef.current.push(cube);
      });
    });

    // Add very subtle floor plane for depth perception
    const floorGeometry = new THREE.PlaneGeometry(gridSize.cols * 2, gridSize.rows * 2);
    const floorMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x111111,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2; // Rotate to be horizontal
    floor.position.set(gridSize.cols / 2, 0, gridSize.rows / 2);
    
    sceneRef.current.add(floor);
    cubesRef.current.push(floor);

  }, [layers, isInitialized, gridSize.cols, gridSize.rows]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
    />
  );
};

export default GridVisualization;