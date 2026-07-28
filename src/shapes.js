
import { valueArrayToAscii } from "./convert.js";

// generic function iterator for math functions 
export function genValues(planeSize=200,clamp,callback,options){
    const values=[];// the plane rotated is by 90 degrees so the x axis becomes y etc
    const planeStride=planeSize/2;

    //generate graph values
    for (let x = (-1*planeStride); x <= planeStride; x++) {
        values.push(Math.min(Math.max(callback(x,options),clamp*-1),clamp));
    }
    return(values);
}

//math functions
export function sin(x,options={}){
    const {
        frequency=0.1,
        amplitude=10,
        offset=0,
    }=options;
    return Math.sin(x*frequency)*amplitude+offset;
}
export function cos(x,options={}){
    const {
        frequency=0.1,
        amplitude=10,
        offset=0,
    }=options;
    return Math.cos(x*frequency)*amplitude+offset;
}
export function tan(x,options={}){
    const {
        frequency=0.1,
        amplitude=10,
        offset=0,
    }=options;
    return Math.tan(x*frequency)*amplitude+offset;
}
export function parabola(x,options={}){
    const {
        a=0.1,
        b=0,
        c=0,
    }=options;
    return a*x**2+b*x+c;
}
export function line(x,options={}){
    const {
        slope=0,
        offset=0,
    }=options;
    return slope*x+offset;
}
export function hyperbola(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
    }=options;
    return (a/(b*x))+c;
}
export function exponential(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
    }=options;
    return (a*b**x)+c;
}
export function cubic(x,options={}){
    const {
        a=1,
        b=1,
        c=1,
        d=0,
    }=options;
    return (a*x**3)+(b*x**2)+(c*x)+d;
}

// function generators, returns line array of converted ascii
export function genSin(options={}){
    const {
        priChar='*',
        secChar='-',
        primaryDelimAmount=1,
        planeSize=200,
        clamp=100,
        frequency=0.1,
        amplitude=10,
        offset=0,
    }=options;

    return valueArrayToAscii(genValues(planeSize,clamp,sin,options),priChar,secChar,primaryDelimAmount);
}
export function genCos(options={}){
    const {
        priChar='*',
        secChar='-',
        primaryDelimAmount=1,
        planeSize=200,
        clamp=100,
        frequency=0.1,
        amplitude=10,
        offset=0,
    }=options;

    return valueArrayToAscii(genValues(planeSize,clamp,cos,options),priChar,secChar,primaryDelimAmount);
}
export function genTan(options={}){
    const {
        priChar='*',
        secChar='-',
        primaryDelimAmount=1,
        planeSize=200,
        clamp=100,
        frequency=0.1,
        amplitude=10,
        offset=0,
    }=options;

    return valueArrayToAscii(genValues(planeSize,clamp,tan,options),priChar,secChar,primaryDelimAmount);
}
export function genParabola(options={}){
    const {
        priChar='*',
        secChar='-',
        primaryDelimAmount=1,
        planeSize=200,
        clamp=100,
        a=0.1,
        b=0,
        c=0,
    }=options;

    return valueArrayToAscii(genValues(planeSize,clamp,parabola,options),priChar,secChar,primaryDelimAmount);
}
export function genLine(options={}){
    const {
        priChar='*',
        secChar='-',
        primaryDelimAmount=1,
        planeSize=200,
        clamp=100,
        slope=0,
        offset=0,
    }=options;

    return valueArrayToAscii(genValues(planeSize,clamp,line,options),priChar,secChar,primaryDelimAmount);
}
export function genHyperbola(options={}){
    const {
        priChar='*',
        secChar='-',
        primaryDelimAmount=1,
        planeSize=200,
        clamp=100,
        a=1,
        b=1,
        c=0,
    }=options;

    return valueArrayToAscii(genValues(planeSize,clamp,hyperbola,options),priChar,secChar,primaryDelimAmount);
}
export function genExponential(options={}){
    const {
        priChar='*',
        secChar='-',
        primaryDelimAmount=1,
        planeSize=200,
        clamp=100,
        a=1,
        b=1,
        c=0,
    }=options;

    return valueArrayToAscii(genValues(planeSize,clamp,exponential,options),priChar,secChar,primaryDelimAmount);
}
export function genCubic(options={}){
    const {
        priChar='*',
        secChar='-',
        primaryDelimAmount=1,
        planeSize=200,
        clamp=100,
        a=1,
        b=1,
        c=1,
        d=0,
    }=options;

    return valueArrayToAscii(genValues(planeSize,clamp,cubic,options),priChar,secChar,primaryDelimAmount);
}

//shape generators, returns line array of converted ascii(FUTURE!  cubes,circle,triangle,square)