import { PointsToAscii } from "./convert.js";
import { transposePoints } from "./transform.js";

// generic function iterator for math functions 
//FUTURE! change to points{x,y} array instead of value array 
export function genPoints(planeSize=200,callback,options={}){
    const points=[];// the plane rotated is by 90 degrees so the x axis becomes y etc
    const planeStride=planeSize/2;
    
    //generate graph values
    for (let x = (-1*planeStride); x <= planeStride; x++) {
        const point=callback(x,options);
        if(Array.isArray(point[0])){
            points.push(...point);
        }
        else{
            points.push(point);
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
        clamp=50,
    }=options;
    const mathFunction=Math.sin(x*frequency)*amplitude+offset
    return [x , Math.min(clamp,Math.max(mathFunction,clamp))];
}
export function cos(x,options={}){
    const {
        frequency=0.1,
        amplitude=10,
        offset=0,
        clamp=50,
    }=options;
    const mathFunction=Math.cos(x*frequency)*amplitude+offset;
    return [x , Math.min(clamp,Math.max(mathFunction,clamp))];
}
export function tan(x,options={}){
    const {
        frequency=0.1,
        amplitude=10,
        offset=0,
        clamp=50,
    }=options;
    const mathFunction=Math.tan(x*frequency)*amplitude+offset;
    return [x , Math.min(clamp,Math.max(mathFunction,clamp))];
}
export function parabola(x,options={}){
    const {
        a=0.3,
        b=0,
        c=0,
        clamp=50,
    }=options;
    const mathFunction=a*x**2+b*x+c;
    return [x,Math.min(clamp,Math.max(mathFunction,-clamp))];
}
export function line(x,options={}){
    const {
        slope=0,
        offset=0,
        clamp=50
    }=options;
    const mathFunction=slope*x+offset;
    return [x , Math.min(clamp,Math.max(mathFunction,-clamp))];
}
export function hyperbola(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
        clamp=50,
    }=options;
    const mathFunction=(a/(b*x))+c;
    return [x , Math.min(clamp,Math.max(mathFunction,-clamp))];
}
export function exponential(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
        clamp=50,
    }=options;
    const mathFunction=(a*b**x)+c;
    return [x , Math.min(clamp,Math.max(mathFunction,-clamp))];
}
export function cubic(x,options={}){
    const {
        a=1,
        b=1,
        c=1,
        d=0,
        clamp=50,
    }=options;
    const mathFunction=(a*x**3)+(b*x**2)+(c*x)+d;
    return [x , Math.min(clamp,Math.max(mathFunction,-clamp))];
}
export function circle(x,options={}){
    const {
        r=10,
        clamp=50,
    }=options;
    const mathFunction=Math.sqrt(r**2-x**2)
    const y=Math.min(clamp,Math.max(mathFunction,-clamp))
    if (Math.abs(x) > r) return [];
    return [[x,y],[x,-y]];
}



