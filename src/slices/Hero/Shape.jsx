"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
    const [isTabletScreen, setIsTabletScreen] = useState(false);

    useEffect(() => {
        // Function to determine if the screen size is for a tablet
        const checkIfTabletScreen = () => window.innerWidth > 768 && window.innerWidth <= 1024;

        const handleResize = () => {
            const isTablet = checkIfTabletScreen();
            setIsTabletScreen(isTablet);
            console.log('Is tablet screen:', isTablet);
        };

        // Set the initial state based on the current window size
        handleResize();

        window.addEventListener('resize', handleResize);

        // Clean up function to remove the event listener
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square  md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas
                className="z-0"
                shadows
                gl={{ antialias: false }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
            >
                <Suspense fallback={null}>
                    <Geometries isTabletScreen={isTabletScreen}/>
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.65}
                        scale={40}
                        blur={1}
                        far={9}
                    />
                    <Environment preset="studio" />
                </Suspense>
            </Canvas>
        </div>
    );
}

function Geometries({ isTabletScreen }) {
    const positionForTabletScreen = [2, 0, 0]
    const defaultPosition = [0, 0, 0]

    const geometries = [
    
        {
            position: isTabletScreen ? positionForTabletScreen : defaultPosition,
            r: 0.5,
            geometry: new THREE.TorusGeometry(3, 1, 16, 32), // Donut
        },

    ];

    const soundEffects = [
        new Audio("/sounds/hit2.ogg"),
        new Audio("/sounds/hit3.ogg"),
        new Audio("/sounds/hit4.ogg"),
    ];

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
        new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({
            roughness: 0,
            metalness: 0.5,
            color: 0x2980b9,
        }),
        new THREE.MeshStandardMaterial({
            color: 0x2c3e50,
            roughness: 0.1,
            metalness: 0.5,
        }),
    ];

    console.log('Geometries isTabletScreen:', isTabletScreen); // Debugging line

    return geometries.map(({ position, r, geometry }) => {
        const adjustedPosition = isTabletScreen ? positionForTabletScreen : defaultPosition;
        console.log('Adjusted position:', adjustedPosition); // Debugging line
        return (
            <Geometry
                key={JSON.stringify(position)} // Unique key
                position={adjustedPosition.map((p) => p * 2)}
                geometry={geometry}
                materials={materials}
                r={r}
            />
        );
    });
}

 function Geometry({ r, position, geometry, materials }) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(false);

    const soundEffects = [
        new Audio("/sounds/hit2.ogg"),
        new Audio("/sounds/hit3.ogg"),
        new Audio("/sounds/hit4.ogg"),
    ];

    const startingMaterial = getRandomMaterial();

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }

    function handleClick(e) {
        const mesh = e.object;

        const soundEffectIndex = Math.floor(Math.random() * soundEffects.length);
        const soundEffect = soundEffects[soundEffectIndex];
        soundEffect.play();


        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 2)}`,
            y: `+=${gsap.utils.random(0, 2)}`,
            z: `+=${gsap.utils.random(0, 2)}`,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            yoyo: true,
        });

        mesh.material = getRandomMaterial();
    }

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = () => {
        document.body.style.cursor = "default";
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            setVisible(true);
            gsap.from(meshRef.current.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: gsap.utils.random(0.8, 1.2),
                ease: "elastic.out(1,0.3)",
                delay: gsap.utils.random(0, 0.5),
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <group position={position} ref={meshRef}>
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                <mesh
                    geometry={geometry}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    visible={visible}
                    material={startingMaterial}
                ></mesh>
            </Float>
        </group>
    );
}