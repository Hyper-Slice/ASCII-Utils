//imports
import * as transform from "./transform.js";
import * as convert from "./convert.js";


//iterators
// (FUTURE! might add a polar iterator)


// takes a callback function that returns points for a input value for a set of numbers(cartesian)
export function genPoints(options={}){
    const {
        sampleFunction,// the function you want to sample 
        rangeRestriction=rangeClip, // the function that restricts the sample function output 
        xAxisLength=30,// the x axis value range, note that it goes from -half to +half
        yAxisLength=30,//same for y
        samplingResolution=1,// the size in which we step trough the x axis 
    }=options;
    const points=[];
    const halfXAxis=xAxisLength/2;
    
    //generate graph values
    for (let x = (-1*halfXAxis); x <= halfXAxis; x+=samplingResolution) {

        let output=sampleFunction(x,options);
        //multiple output points
        if(Array.isArray(output[0])){

            for(let index = 0; index < output.length; index++) {

                let point = output[index];
                point[1]=rangeRestriction(point[1],yAxisLength);
                if (output.flat(Infinity).every(Number.isFinite)){

                    points.push(point);

                }
            }
        }

        else{
            // single output point
            output[1]=rangeRestriction(output[1],yAxisLength);
            if(output.flat(Infinity).every(Number.isFinite)){
                
                points.push(output);
            }
        }
    }
    return(points);
}



//range restriction strategies 

function rangeClamp(value,threshold){
    return Math.min(threshold,Math.max(value,-threshold));
}

function rangeClip(value,threshold){
    return (value>threshold)||(value<-threshold)? +Infinity : value;
}



//math functions 


//(cartesian)
export function sin(x,options={}){
    const {
        freq=0.4,
        amp=10,
        offset=0,
    }=options;
    const y=Math.sin(x*freq)*amp+offset
    return [x,y];
}

export function cos(x,options={}){
    const {
        freq=0.1,
        amp=10,
        offset=0,
    }=options;
    const y=Math.cos(x*freq)*amp+offset;
    return [x,y];
}

export function tan(x,options={}){
    const {
        freq=0.1,
        amp=10,
        offset=0,
    }=options;
    const y=Math.tan(x*freq)*amp+offset;
    return [x,y];
}

export function parabola(x,options={}){
    const {
        a=1,
        b=0,
        c=0,
    }=options;
    const y=a*x**2+b*x+c;
    return [x,y];
}

export function line(x,options={}){
    const {
        m=1,
        c=0,
    }=options;
    const y=m*x+c;
    return [x,y];
}

export function hyperbola(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
    }=options;
    const y=(a/(b*x))+c;
    return [x,y];
}

export function exponential(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
    }=options;
    const y=(a*b**x)+c;
    return [x,y];
}

export function euler(x,options={}){
    const {
        a=1,
        b=1,
        c=0,
    }=options;
    const y=(a*Math.E**x)+c;
    return [x,y];
}

export function cubic(x,options={}){
    const {
        a=1,
        b=1,
        c=1,
        d=0,
    }=options;
    const y=(a*x**3)+(b*x**2)+(c*x)+d;
    return [x,y];
}

export function circle(x,options={}){
    const {
        r=10,
    }=options;
    const y=Math.sqrt(r**2-x**2)
    return [[x,y],[x,-y]];
}

//shape functions
export function rectangle(options={}){
    const {
        height=10,
        width=10,
    }=options;
}

