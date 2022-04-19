import Sketch from "react-p5";
import p5Types from "p5";
import React, {useEffect, useState} from "react"; //Import this for typechecking and intellisense
interface ComponentProps {

}

let x = 50;
const y = 50;
const GraduationP52022: React.FC<ComponentProps> = (props) => {
    const [mb, setMb] = useState(0)
    useEffect(() => {

        const mb = window.screen.width
    },[])
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(mb, mb).parent(canvasParentRef);
    };

    const draw = (p5: p5Types) => {
        p5.background(0);
        p5.ellipse(x, y, 70, 70);
        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
        x++;
    };

    return <Sketch setup={setup} draw={draw}/>

}

export default GraduationP52022