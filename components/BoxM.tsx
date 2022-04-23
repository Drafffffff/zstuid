import {NextPage} from "next";
import {Canvas, useFrame, Vector3, extend, useThree, useLoader} from '@react-three/fiber'
import React, {useRef, useState, Suspense, FC, useEffect, useMemo, useCallback, useLayoutEffect} from 'react'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import {useWindowSize} from "usehooks-ts";
import {TextureLoader} from 'three/src/loaders/TextureLoader';
// import { VertexNormalsHelper } from "three/examples/jsm/helpers/VertexNormalsHelper";

// import { FaceNormalsHelper } from "three/examples/jsm/helpers/";

extend(OrbitControls)
const CameraController = () => {
    const {camera, gl} = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);

            return () => {
                controls.dispose();
            };
        },
        [camera, gl]
    );
    return null;
};

interface BoxProps {
    position: Vector3
}

const BoxItem: FC<BoxProps> = (props) => {
    const mesh = useRef(null)
    const [active, setActive] = useState(false)
    useFrame(() => {
        // @ts-ignore
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })
    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [6, 6, 6] : [5, 5, 5]}
            onClick={() => setActive(!active)}
        >
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshStandardMaterial
                attach="material"
                color={'#d87e93'}
            />
        </mesh>
    )
}

interface cubeProps {

}

const Cubes: FC<cubeProps> = (props) => {
    const a = 4;
    const [DesignT, DeliverT, DepartmentT, DigitalT] = useLoader(TextureLoader, [
        require('/public/img/aboutUs/design.png').default.src,
        require('/public/img/aboutUs/deliver.png').default.src,
        require('/public/img/aboutUs/department.png').default.src,
        require('/public/img/aboutUs/digital.png').default.src,
    ])

    function getCubePos(size: number) {
        const pos = [
            new THREE.Vector3(-size, size, -size),
            new THREE.Vector3(size, size, -size),
            new THREE.Vector3(size, size, size),
            new THREE.Vector3(-size, size, size),
            new THREE.Vector3(-size, -size, -size),
            new THREE.Vector3(size, -size, -size),
            new THREE.Vector3(size, -size, size),
            new THREE.Vector3(-size, -size, size)
        ];
        return pos
    }

    function getCubeLine(pos: THREE.Vector3[]) {
        return [[pos[0], pos[3]],
            [pos[0], pos[1]],
            [pos[0], pos[4]],
            [pos[1], pos[2]],
            [pos[1], pos[5]],
            [pos[2], pos[6]],
            [pos[2], pos[3]],
            [pos[3], pos[7]],
            [pos[4], pos[5]],
            [pos[4], pos[7]],
            [pos[5], pos[6]],
            [pos[6], pos[7]],]
    }

    function getOtherLine(pos: THREE.Vector3[], pos2: THREE.Vector3[]) {
        return [[pos[0], pos2[0]],
            [pos[1], pos2[1]],
            [pos[2], pos2[2]],
            [pos[3], pos2[3]],
            [pos[4], pos2[4]],
            [pos[5], pos2[5]],
            [pos[6], pos2[6]],
            [pos[7], pos2[7]],]
    }

    const [normalCube, smallCube, cubeLine, smLine, otherLine] = useMemo(() => {
        const pos1 = getCubePos(10)
        const pos2 = getCubePos(a)
        const outline1 = getCubeLine(pos1)
        const outline2 = getCubeLine(pos2)
        const outline3 = getOtherLine(pos1, pos2)
        return [pos1, pos2, outline1, outline2, outline3]
    }, [a]);
    const groupRef = useRef(null)
    const smCubesRef = useRef([])
    const cubeLinesRef = useRef([])
    const smCubeLinesRef = useRef([])
    const otherCubeLinesRef = useRef([])
    const _groupRef = useRef(null)
    const _cubeLinesRef = useRef([])
    const _smCubeLinesRef = useRef([])
    const _otherCubeLinesRef = useRef([])
    useFrame((state) => {
        // pointsRef.current.rotation.x = pointsRef.current.rotation.y += 0.01
        const time = state.clock.getElapsedTime()
        const scale = 4.5 + Math.sin(time * 1.5) * 2
        const curPos = getCubePos(scale)

        // @ts-ignore
        groupRef.current.rotation.x = Math.sin(time / 4) / 2
        // @ts-ignore
        groupRef.current.rotation.y = Math.sin(time / 4) * Math.PI
        // @ts-ignore
        // groupRef.current.rotation.z = Math.sin(time / 2)
        // @ts-ignore
        _groupRef.current.rotation.x = Math.sin((time + 20) / 4)
        // @ts-ignore
        _groupRef.current.rotation.y = Math.sin((time + 20) / 2)
        smCubeLinesRef.current.map((e, i) => {
            const curLine = getCubeLine(curPos)
            // @ts-ignore
            e.setFromPoints(curLine[i])
        })
        otherCubeLinesRef.current.map((e, i) => {
            const curLine = getOtherLine(normalCube, curPos)
            // @ts-ignore
            e.setFromPoints(curLine[i])
        })
        smCubesRef.current.map((e, i) => {
            // console.log(e.position)
            // @ts-ignore
            e.position.set(curPos[i].x, curPos[i].y, curPos[i].z)
        })

    })
    useLayoutEffect(() => {
        cubeLinesRef.current.map((e, i) => {
            // @ts-ignore
            e.setFromPoints(cubeLine[i])
        })

        _cubeLinesRef.current.map((e, i) => {
            // @ts-ignore
            e.setFromPoints(cubeLine[i])
        })
        _smCubeLinesRef.current.map((e, i) => {
            // @ts-ignore
            e.setFromPoints(smLine[i])
        })
        _otherCubeLinesRef.current.map((e, i) => {
            // @ts-ignore
            e.setFromPoints(otherLine[i])
        })

        // @ts-ignore
        console.log(smCubesRef.current[0].position)
    }, [])
    return (
        <group>
            <group ref={groupRef}>
                <group>
                    {normalCube.map((e, i) => (
                        <mesh key={i} position={e}>
                            <sphereBufferGeometry args={[0.15, 16, 8]}/>
                            <meshBasicMaterial color={'#f0fe97'}/>
                        </mesh>
                    ))}
                    {smallCube.map((e, i) => (
                        <mesh key={i} position={e} ref={
                            // @ts-ignore
                            el => smCubesRef.current[i] = el}>
                            <sphereBufferGeometry args={[0.1, 16, 8]}/>
                            <meshBasicMaterial color={'#f0fe97'}/>
                        </mesh>
                    ))}
                </group>
                <group>
                    {cubeLine.map((e, i) => (
                        <line key={i}>
                            <bufferGeometry attach="geometry" ref={
                                // @ts-ignore
                                el => cubeLinesRef.current[i] = el}/>
                            <lineBasicMaterial attach="material" color={'#fff'} linewidth={0.6} linecap={'round'}
                                               linejoin={'round'}/>
                        </line>
                    ))}
                    {smLine.map((e, i) => (
                        <line key={i}>
                            <bufferGeometry attach="geometry" ref={
                                // @ts-ignore
                                el => smCubeLinesRef.current[i] = el}/>
                            <lineBasicMaterial attach="material" color={'#fff'} linewidth={0.6} linecap={'round'}
                                               linejoin={'round'}/>
                        </line>
                    ))}
                    {otherLine.map((e, i) => (
                        <line key={i}>
                            <bufferGeometry attach="geometry" ref={
                                // @ts-ignore
                                el => otherCubeLinesRef.current[i] = el}/>
                            <lineBasicMaterial attach="material" color={'#f0fe97'} linewidth={1} linecap={'round'}
                                               linejoin={'round'}/>
                        </line>
                    ))}
                </group>
                <group>
                    <mesh position={[0, 0, 10]} scale={[20, 20, 20]}>
                        <planeBufferGeometry/>
                        <meshBasicMaterial  map={DesignT} transparent={true} opacity={0.5}/>
                    </mesh>
                    <mesh position={[0, 0, -10]} rotation={[0, Math.PI, 0]} scale={[20, 20, 20]}>
                        <planeBufferGeometry/>
                        <meshBasicMaterial  map={DeliverT} transparent={true} opacity={0.5}/>
                    </mesh>
                    <mesh position={[-10, 0, 0]} rotation={[0, Math.PI * 1.5, 0]} scale={[20, 20, 20]}>
                        <planeGeometry/>
                        <meshBasicMaterial  map={DepartmentT} transparent={true} opacity={0.5}/>
                    </mesh>
                    <mesh position={[10, 0, 0]} rotation={[0, Math.PI * 0.5, 0]} scale={[20, 20, 20]}>
                        <planeGeometry/>
                        <meshBasicMaterial  map={DigitalT}  transparent={true} opacity={0.5}/>
                    </mesh>
                </group>
            </group>
            <group ref={_groupRef} scale={0.95}>
                {   // @ts-ignore
                    cubeLine.map((e, i) => (<line key={i}>
                            <bufferGeometry attach="geometry" ref={
                                // @ts-ignore
                                el => _cubeLinesRef.current[i] = el}/>
                            <lineDashedMaterial color={'#fff'} dashSize={0.1} gapSize={0.1} linewidth={0.001}
                                                opacity={0.4} transparent={true}/>
                        </line>
                    ))}
                {   // @ts-ignore
                    smLine.map((e, i) => (<line key={i}>
                            <bufferGeometry attach="geometry" ref={
                                // @ts-ignore
                                el => _smCubeLinesRef.current[i] = el}/>
                            <lineDashedMaterial color={'#fff'} dashSize={0.1} gapSize={0.1} linewidth={0.001}
                                                opacity={0.4} transparent={true}/>
                        </line>
                    ))}
                {   // @ts-ignore
                    otherLine.map((e, i) => (<line key={i}>
                            <bufferGeometry attach="geometry" ref={
                                // @ts-ignore
                                el => _otherCubeLinesRef.current[i] = el}/>
                            <lineDashedMaterial color={'#f0fe97'} dashSize={0.1} gapSize={0.1} linewidth={0.001}
                                                opacity={0.4} transparent={true}/>
                        </line>
                    ))}
            </group>


        </group>

    )
}


const Box: NextPage = () => {
    const sizes = useWindowSize()
    return (
        <Canvas camera={{position: [0, 0, 30]}}>
            <CameraController/>
            {/*<ambientLight intensity={2}/>*/}
            {/*<pointLight position={[40, 40, 40]}/>*/}
            <Suspense fallback={null}>
                <perspectiveCamera
                    fov={0}
                    aspect={sizes.width / sizes.height}
                    position={[0, 0, 0]}
                    near={0.1}
                    far={100}
                >
                    <Cubes/>
                </perspectiveCamera>
                {/*<BoxItem position={[0, 0, 0]}/>*/}
                {/*<axesHelper scale={10}/>*/}

            </Suspense>
        </Canvas>
    )
}
// export default BirdsPage
export default Box