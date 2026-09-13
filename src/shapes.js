//imports

import * as convert from "./convert.js";
import * as transform from "./transform.js";



// takes a callback function that returns points for a input value for a set of numbers(cartesian)
export function genPoints(options={}){
    const {
        sampleFunction,// the function you want to sample 
        rangeRestriction=rangeClip, // the function that restricts the sample function output 
        xAxisBounds=[-15,15],
        yAxisBounds=[-15,15],
        samplingResolution=1,// the size in which we step trough the x axis 
    }=options;

    const points=[];
    
    //generate graph values
    for (let x = xAxisBounds[0]; x <= xAxisBounds[1]; x+=samplingResolution) {

        let output=sampleFunction(x,options);
        //multiple output points
        if(Array.isArray(output[0])){

            for(let index = 0; index < output.length; index++) {

                let point = output[index];
                point[1]=rangeRestriction(point[1],Math.abs(yAxisBounds));
                if (output.flat(Infinity).every(Number.isFinite)){

                    points.push(point);

                }
            }
        }

        else{
            // single output point
            output[1]=rangeRestriction(output[1],Math.abs(yAxisBounds));
            if(output.flat(Infinity).every(Number.isFinite)){
                
                points.push(output);
            }
        }
    }
    return(points);
}

// takes a shape list and converts it to points
export function genShape(shape,options={}){
    let points=[];

    shape.forEach(segment => {

        const xStart = segment.origin[0];
        const xEnd = segment.endPoint[0];

        if (segment.origin[0] === segment.endPoint[0]) {

          let yStart=Math.min(segment.origin[1],segment.endPoint[1]);
          let yEnd=Math.max(segment.origin[1],segment.endPoint[1]);

          for (let y = yStart; y <= yEnd; y+=options.samplingResolution) {
            points.push([[segment.origin[0],y]]);
          }
          
        }else{
            const segmentPoints=genPoints({
            ...segment,
            ...options,
            xAxisBounds:[Math.min(xStart,xEnd),
                        Math.max(xStart,xEnd)]});

            if(xStart>xEnd){segmentPoints.reverse()};

            points.push(segmentPoints);
        }
        
    });
    

    return points.flat();
}

export function addSegment(line={}){
    const {
        origin=[0,0],
        endPoint=[1,1],
    }=line;
    const m= (endPoint[1]-origin[1])/(endPoint[0]-origin[0]);
    const c= origin[1]- m*origin[0];
    return {origin,endPoint,m,c};

}


//range restrictions 

function rangeClamp(value,threshold){
    return Math.min(threshold[1],Math.max(value,threshold[0]));
}

function rangeClip(value,threshold){
    return (value>threshold[1])||(value<threshold[0])? +Infinity : value;
}

//shape lists (note Ai generated im to lazy to do all that)

// Triangle
const triangle = [
    addSegment({ origin: [-6, -4], endPoint: [6, -4] }),
    addSegment({ origin: [6, -4], endPoint: [0, 6] }),
    addSegment({ origin: [0, 6], endPoint: [-6, -4] }),
];


// Rectangle
const rectangle = [
    addSegment({ origin: [-7, -4], endPoint: [7, -4] }),
    addSegment({ origin: [7, -4], endPoint: [7, 4] }),
    addSegment({ origin: [7, 4], endPoint: [-7, 4] }),
    addSegment({ origin: [-7, 4], endPoint: [-7, -4] }),
];


// Diamond
const diamond = [
    addSegment({ origin: [0, 7], endPoint: [6, 0] }),
    addSegment({ origin: [6, 0], endPoint: [0, -7] }),
    addSegment({ origin: [0, -7], endPoint: [-6, 0] }),
    addSegment({ origin: [-6, 0], endPoint: [0, 7] }),
];


// House
const house = [
    // Outer house
    addSegment({ origin: [-7, -5], endPoint: [7, -5] }),
    addSegment({ origin: [7, -5], endPoint: [7, 2] }),
    addSegment({ origin: [7, 2], endPoint: [0, 8] }),
    addSegment({ origin: [0, 8], endPoint: [-7, 2] }),
    addSegment({ origin: [-7, 2], endPoint: [-7, -5] }),

    // Door
    addSegment({ origin: [-1.5, -5], endPoint: [-1.5, 0] }),
    addSegment({ origin: [-1.5, 0], endPoint: [1.5, 0] }),
    addSegment({ origin: [1.5, 0], endPoint: [1.5, -5] }),
    addSegment({ origin: [0.9, -2.5], endPoint: [0.9, -2.5] }),

    // Window
    addSegment({ origin: [3, -1], endPoint: [6, -1] }),
    addSegment({ origin: [6, -1], endPoint: [6, 1.5] }),
    addSegment({ origin: [6, 1.6], endPoint: [3, 1.5] }),
    addSegment({ origin: [3, 1.5], endPoint: [3, -1] }),

    // Window cross
    addSegment({ origin: [4.5, -1], endPoint: [4.5, 1.5] }),
    addSegment({ origin: [3, 0.25], endPoint: [6, 0.25] }),
];


//cube 
const cube = [
    // Front face
    addSegment({ origin: [-5, -5], endPoint: [5, -5] }),
    addSegment({ origin: [5, -5], endPoint: [5, 5] }),
    addSegment({ origin: [5, 5], endPoint: [-5, 5] }),
    addSegment({ origin: [-5, 5], endPoint: [-5, -5] }),

    // Back face
    addSegment({ origin: [-2, -2], endPoint: [8, -2] }),
    addSegment({ origin: [8, -2], endPoint: [8, 8] }),
    addSegment({ origin: [8, 8], endPoint: [-2, 8] }),
    addSegment({ origin: [-2, 8], endPoint: [-2, -2] }),

    // Depth edges
    addSegment({ origin: [-5, -5], endPoint: [-2, -2] }),
    addSegment({ origin: [5, -5], endPoint: [8, -2] }),
    addSegment({ origin: [5, 5], endPoint: [8, 8] }),
    addSegment({ origin: [-5, 5], endPoint: [-2, 8] }),
]


// Hexagon
const hexagon = [
    addSegment({ origin: [-4, 7], endPoint: [4, 7] }),
    addSegment({ origin: [4, 7], endPoint: [8, 0] }),
    addSegment({ origin: [8, 0], endPoint: [4, -7] }),
    addSegment({ origin: [4, -7], endPoint: [-4, -7] }),
    addSegment({ origin: [-4, -7], endPoint: [-8, 0] }),
    addSegment({ origin: [-8, 0], endPoint: [-4, 7] }),
];


// Arrow
const arrow = [
    addSegment({ origin: [-8, 0], endPoint: [5, 0] }),
    addSegment({ origin: [5, 0], endPoint: [1, 4] }),
    addSegment({ origin: [5, 0], endPoint: [1, -4] }),
];


// Cross
const cross = [
    addSegment({ origin: [-6, -2], endPoint: [-2, -2] }),
    addSegment({ origin: [-2, -2], endPoint: [-2, -6] }),
    addSegment({ origin: [-2, -6], endPoint: [2, -6] }),
    addSegment({ origin: [2, -6], endPoint: [2, -2] }),
    addSegment({ origin: [2, -2], endPoint: [6, -2] }),
    addSegment({ origin: [6, -2], endPoint: [6, 2] }),
    addSegment({ origin: [6, 2], endPoint: [2, 2] }),
    addSegment({ origin: [2, 2], endPoint: [2, 6] }),
    addSegment({ origin: [2, 6], endPoint: [-2, 6] }),
    addSegment({ origin: [-2, 6], endPoint: [-2, 2] }),
    addSegment({ origin: [-2, 2], endPoint: [-6, 2] }),
    addSegment({ origin: [-6, 2], endPoint: [-6, -2] }),
];


// Star
const star = [
    addSegment({ origin: [0, 8], endPoint: [2, 2] }),
    addSegment({ origin: [2, 2], endPoint: [8, 2] }),
    addSegment({ origin: [8, 2], endPoint: [3, -1] }),
    addSegment({ origin: [3, -1], endPoint: [5, -7] }),
    addSegment({ origin: [5, -7], endPoint: [0, -3] }),
    addSegment({ origin: [0, -3], endPoint: [-5, -7] }),
    addSegment({ origin: [-5, -7], endPoint: [-3, -1] }),
    addSegment({ origin: [-3, -1], endPoint: [-8, 2] }),
    addSegment({ origin: [-8, 2], endPoint: [-2, 2] }),
    addSegment({ origin: [-2, 2], endPoint: [0, 8] }),
];



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
        r=1,
    }=options;
    const y=Math.sqrt(r**2-x**2)
    return [[x,y],[x,-y]];
}

