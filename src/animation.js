import * as convert from "./convert.js";
import * as transform from "./transform.js";
import * as images from  "./images.js";
import * as shapes from "./shapes.js";


export function captureAnimationFrames(options={}){
    const {
        animationRate,//the rate at which this parameter changes
        startValue,// the starting value
        stopValue,//the end value 
        animationParameter,//what you want animated eg rotation freq a b c d slope etc two types of rotation viewport and points
    }=options;
    let frames=[];
    for (let parameterValue = startValue; parameterValue <= stopValue; parameterValue+=animationRate) {
        frames.push(convert.viewportPipelineHelper({...options,[animationParameter]:parameterValue}));

    }
    return frames;
}  





