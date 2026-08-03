import { PointsToAscii } from "./convert.js";
import * as transform from "./transform.js";


export function genPoints(callback,options={}){
    const {
        xAxisLength=30,
        stepSize=1,
    }=options;
    const points=[];
    const halfAxis=xAxisLength/2;
    
    //generate graph values
    for (let x = (-1*halfAxis); x <= halfAxis; x+=stepSize) {
        const output=callback(x,options);
        if(Array.isArray(output[0])){

            for (let index = 0; index < output.length; index++) {
                const point = output[index];
                if(!point.flat(Infinity).some(isNaN)){
                    points.push(point);
                }
            }
        }
        else{
            if(!output.flat(Infinity).some(isNaN)){
                points.push(output);
            }
        }
    }
    return(points);
}

//math functions
export function sin(x,options={}){
    const {
        frequency=0.1,
        amplitude=10,
        offset=0,
        yAxisLength=30,
    }=options;
    const mathFunction=Math.sin(x*frequency)*amplitude+offset
    return [x , Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))];
}
export function cos(x,options={}){
    const {
        frequency=0.1,
        amplitude=10,
        offset=0,
        yAxisLength=30,
    }=options;
    const mathFunction=Math.cos(x*frequency)*amplitude+offset;
    return [x , Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))];
}
export function tan(x,options={}){
    const {
        frequency=0.1,
        amplitude=10,
        offset=0,
        yAxisLength=30,
    }=options;
    const mathFunction=Math.tan(x*frequency)*amplitude+offset;
    return [x , Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))];
}
export function parabola(x,options={}){
    const {
        a=-0.3,
        b=0,
        c=0,
        yAxisLength=100,
    }=options;
    const mathFunction=a*x**2+b*x+c;
    return [x,Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))];
}
export function line(x,options={}){
    const {
        slope=1,
        offset=0,
        yAxisLength=30
    }=options;
    const mathFunction=slope*x+offset;
    return [x , Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))];
}
export function hyperbola(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
        yAxisLength=30,
    }=options;
    const mathFunction=(a/(b*x))+c;
    return [x , Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))];
}
export function exponential(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
        yAxisLength=30,
    }=options;
    const mathFunction=(a*b**x)+c;
    return [x , Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))];
}
export function cubic(x,options={}){
    const {
        a=1,
        b=1,
        c=1,
        d=0,
        yAxisLength=30,
    }=options;
    const mathFunction=(a*x**3)+(b*x**2)+(c*x)+d;
    return [x , Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))];
}
export function circle(x,options={}){
    const {
        r=10,
        yAxisLength=30,
    }=options;
    const mathFunction=Math.sqrt(r**2-x**2)
    const y=Math.min(yAxisLength,Math.max(mathFunction,-yAxisLength))
    return [[x,y],[x,-y]];
}

