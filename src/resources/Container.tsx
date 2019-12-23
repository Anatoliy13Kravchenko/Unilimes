import React from 'react';
import CanvasComponent from './CanvasComponent';
import Dropdown from 'react-bootstrap/Dropdown';
import { match } from 'react-router';

export enum Shapes {
    Cube = 1,
    Circle = 2
}

export enum Scale {
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
}

interface Props {
    history: History
    match: match<any>;
}

interface State {
    shape: number
    scale: number,
    shapeColor: string
}

export default class Container extends React.PureComponent<Props,State> {

    /**
     * @type {{shape: number; scale: number; shapeColor: string}}
     */
    public state = {
        shape: 0,
        scale: 1,
        shapeColor: 'white'
    };

    public componentDidUpdate(prevProps: Props, prevState: State){
        if (this.state.shapeColor !== this.props.match.params.color) {
            this.setState({shapeColor: this.props.match.params.color})
        }
    }

    /**
     * @param {number} shape
     */
    public updateShape = (shape: number) => {
        this.setState({ shape });
    };

    /**
     * @param {string} scale
     */
    public updateScale = (scale: number) => {
        this.setState({ scale });
    };

    public render(): React.ReactNode {
        const { shape, shapeColor, scale} = this.state;

       return (
           <>
               <header className="App-header">
                   <Dropdown>
                       <Dropdown.Toggle variant="success" id="dropdown-basic">
                           Choose shape
                       </Dropdown.Toggle>

                       <Dropdown.Menu>
                           <Dropdown.Item  onClick={ () => this.updateShape(Shapes.Cube)}>Cube</Dropdown.Item>
                           <Dropdown.Item  onClick={ () => this.updateShape(Shapes.Circle)}>Circle</Dropdown.Item>
                       </Dropdown.Menu>
                   </Dropdown>

                   <Dropdown>
                       <Dropdown.Toggle variant="primary" id="dropdown-basic">
                           Choose scale
                       </Dropdown.Toggle>

                       <Dropdown.Menu>
                           <Dropdown.Item  onClick={ () => this.updateScale(Scale.one)}>One</Dropdown.Item>
                           <Dropdown.Item  onClick={ () => this.updateScale(Scale.two)}>Two</Dropdown.Item>
                           <Dropdown.Item  onClick={ () => this.updateScale(Scale.three)}>Three</Dropdown.Item>
                           <Dropdown.Item  onClick={ () => this.updateScale(Scale.four)}>Four</Dropdown.Item>
                           <Dropdown.Item  onClick={ () => this.updateScale(Scale.five)}>Five</Dropdown.Item>
                       </Dropdown.Menu>
                   </Dropdown>
               </header>
               <CanvasComponent shape={shape} shapeColor={shapeColor} scale={scale}/>
           </>
           )
    }
}
