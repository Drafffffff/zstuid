import p5Types from "p5";
import dynamic from 'next/dynamic'
// import Sketch from "react-p5";
const Sketch = dynamic(import('react-p5'), {ssr: false})
import React, {useEffect, useState} from "react";
import {useWindowSize} from "usehooks-ts";
import {tidyUrl} from "./utils";
import p5 from "p5"; //Import this for typechecking and intellisense

interface ComponentProps {
}

let x = 50;
const y = 50;
let img1: p5Types.Image | p5Types.MediaElement | p5Types.Graphics,
    img2: p5Types.Image | p5Types.MediaElement | p5Types.Graphics,
    img3: p5Types.Image | p5Types.MediaElement | p5Types.Graphics;
let theta = 0;
let a = 0;
let b = 2;
let c = 3;
let inc = 0.01;
const zpos = 180;
let width = 0;

interface ComponentProps {
    fatherWidth: number
}

const GraduationP52022: React.FC<ComponentProps> = ({fatherWidth}) => {
    const [width, setWs] = useState(fatherWidth)
    useEffect(() => {
        setWs(fatherWidth);
    }, [fatherWidth])

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(width, width, p5.WEBGL).parent(canvasParentRef);
        p5.imageMode(p5.CENTER);
        // @ts-ignore
        img1 = p5.loadImage(tidyUrl("/uploads/1_3054e7cd2b.png"));
        // @ts-ignore
        img2 = p5.loadImage(tidyUrl("/uploads/2_a9af3c9cd9.png"));
        // @ts-ignore
        img3 = p5.loadImage(tidyUrl("/uploads/3_7b2cb44abf.png"));
    };
    const draw = (p5: p5Types) => {
        p5.background(0);
        // @ts-ignore
        //renyu
        // @ts-ignore
        p5.image(img3, 0, 0, 1.5 * width / 4, 1.5 * width / 4);
        p5.push()
        p5.noStroke();
        p5.translate(width / 16, 50, 20);
        p5.rotateZ(-0.6);
        p5.rotateX(0.6);
        p5.texture(img1);
        p5.rotateY(p5.millis() / 3000);
        p5.cylinder(width * 0.4, width / 16, 24, 1);
        p5.pop()
        //horizon
        p5.push();
        p5.translate(-width * 0.3 / 4, 0, width / 4);
        p5.noStroke();
        p5.rotateZ(0.6);
        p5.rotateX(0.4);
        p5.texture(img2);
        p5.rotateY(p5.millis() / 3000);
        p5.cylinder(width * 0.2, width * 0.08, 24, 1);
        p5.pop();

        p5.push();
        // p5.translate(-width*0.3/4, 0, width/4);
        p5.stroke(240, 254, 151);
        p5.strokeWeight(0.5);
        p5.translate(0, 0, zpos - 1);
        p5.line(-width / 2 + width / 3, -width / 2 + width / 3, 0, width * 0.1, width * 0.1, 0)
        p5.line(-width / 2 + width / 3, width / 2 - width / 3, 0, width * 0.06, -width * 0.06, 0)
        p5.strokeWeight(0.2);

        p5.line(0, -width * 0.15, 0, 0, width * 0.15, 0)
        p5.line(-width * 0.15, 0, 0, width * 0.15, 0, 0)
        p5.noFill()
        p5.strokeWeight(0.3);

        p5.stroke(255)
        p5.ellipse(0, 0, width * 0.25, width * 0.25, 50);
        p5.ellipse(0, 0, width * 0.3 / 4, width * 0.3 / 4, 50);
        p5.pop();


        p5.push();
        // p5.translate(width*0.3, width*0.3, 1.5*width);
        p5.noStroke()
        p5.translate(0, 0, zpos);
        p5.ellipse(p5.cos(a) * 0.125 * width, p5.sin(a) * 0.125 * width, width * 0.08 / 2.8, width * 0.08 / 2.8, 50);
        p5.fill(240, 254, 151);
        p5.ellipse(p5.cos(b) * 0.125 * width, p5.sin(b) * 0.125 * width, width * 0.15 / 2.8, width * 0.15 / 2.8, 50);
        p5.ellipse(p5.cos(c) * 0.125 * width, p5.sin(c) * 0.125 * width, width * 0.05 / 2.8, width * 0.05 / 2.8, 50);

        a = a + inc;
        b = b + inc * 0.7;
        c = c + inc * 1.5;
        theta += 0.05;
        p5.pop();
    };
    const windowResized = (p5: p5Types) => {
        p5.resizeCanvas(width, width)
    }

    return <Sketch setup={setup} draw={draw} windowResized={windowResized}/>

}

export default GraduationP52022