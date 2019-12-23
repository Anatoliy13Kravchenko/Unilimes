import * as THREE from 'three';
import React from 'react';
import Footer from './Footer';

interface State {
    shape: number,
    mouseX: number,
    mouseY: number,
}

interface Props {
    shape: number,
    scale: number,
    shapeColor: string,
}

/**
 *  @class CanvasComponent
 */
export default class CanvasComponent extends React.PureComponent<Props, State> {

    /**
     * @type {{shape: number; scale: string;}}
     */
    public state = {
        shape: 0,
        mouseX: 0,
        mouseY: 0,
    };

    private scene = new THREE.Scene();
    private camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    private renderer = new THREE.WebGLRenderer();

    private animationId: any;

    public componentDidMount() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(this.renderer.domElement);

        // when the mouse moves, call the given function
        // document.addEventListener('mousemove', this.onDocumentMouseMove);
    };

    private paint = (callback: () => any, scale: number) => {

        this.clearScene();

        const figure = callback();

        figure.scale.set(scale, scale, scale);

        const animate = () => {

            figure.rotation.x += 0.01;
            figure.rotation.y += 0.01;
            figure.position.x = 5;
            figure.position.y = 5;

            this.animationId = requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };

        animate();
    };

    private cubeHandler = (): any => {

        const geometryCube = {
            geometry: new THREE.BoxGeometry(1, 1, 1),
            material: new THREE.MeshBasicMaterial({ color: this.props.shapeColor })
        };
        const cube = new THREE.Mesh(geometryCube.geometry, geometryCube.material);

        this.camera.position.z = 10;
        this.camera.position.x = 8;
        this.camera.position.y = 1;

        this.scene.add(cube);

        return cube;
    };

    private circleHandler = (): any => {

        const geometryCircle = {
            geometry: new THREE.CircleBufferGeometry(1, 1, 1),
            material: new THREE.MeshBasicMaterial({ color: this.props.shapeColor })
        };

        const circle = new THREE.Mesh(geometryCircle.geometry, geometryCircle.material);

        this.camera.position.z = 10;
        this.camera.position.x = 8;
        this.camera.position.y = 1;

        this.scene.add(circle);

        return circle;
    };

    private clearScene = () => {
        this.scene.remove.apply(this.scene, this.scene.children);
    };

    private onDocumentMouseMove(event: any) {

        this.setState({mouseX: (event.clientX / window.innerWidth) * 2 - 1});
        this.setState({mouseY:(event.clientY / window.innerHeight) * 2 + 1});
    }

    /**
     * @param {Readonly<P>} shape
     * @param {Readonly<S>} scale
     * @param {State} prevState
     */
    public componentDidUpdate({ shape, scale }: Props, prevState: State) {

        if(this.props.shape !== shape || this.props.scale !== scale) {
            switch (this.props.shape) {
                case 1:
                    this.paint(this.cubeHandler, scale);
                    break;
                case 2:
                    this.paint(this.circleHandler, scale);
                    break;
                default:
                    console.info('No coincidence');
            }
        }
    }

    private mount: any = React.createRef<HTMLDivElement>();

    public render() {

        return (
            <>
                <div className="no-data" style={{ display: !this.mount.hasOwnProperty('current') ? 'none' : 'block' }}>
                    <h2>Choose some shape</h2>
                </div>
                <div ref={ref => (this.mount = ref)} />
                <div className="footer">
                    <Footer deleteShape={this.clearScene} uid={this.animationId}/>
                </div>
            </>);

    }
}
