//imports
import { normalizePoints , addDefaultPointData, rotatePoints2D } from "./transform.js";


//converters 


//takes in a list of points outputs a viewport scaled version.
export function pointsToViewport(points,options={}){
    const {
        emptyPointData={
            char:" ",
        },
        pointData={
            char:"*",
        },
        viewportHeight=100,
        viewportWidth=100,
      
    }=options;
    //rotate the points so graphs display true due to text gong down all functions are flipped 
    // (NOTE! do not rotate after normalization rotation can move values below 0)
    points=normalizePoints(points);
    points=addDefaultPointData(points,pointData);
    

// generate a 2d array filled with new objects 
let viewport = Array.from({ length: viewportHeight },() => Array.from({ length: viewportWidth },() => ({ ...emptyPointData })));
    points.forEach(point=>{
        
        //scale to view port
        const x=Math.round(point[0]*(viewportWidth-1));
        const y=Math.round(point[1]*(viewportHeight-1));
        viewport[y][x]={...point[2]};
    });
    return viewport; 
}


//rasterizer's


//returns a string version of the viewport(work in progress)
export function viewportToString(viewport){
    return viewport.map(row=>

        row.map(point=>
        point.char)
        .join('')

    )
    .join('\n');
}