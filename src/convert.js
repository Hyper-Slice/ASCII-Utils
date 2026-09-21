//imports
import * as transform from "./transform.js";
import * as images from  "./images.js";
import * as shapes from "./shapes.js";

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
    points=transform.rotatePoints2D(points,180);
    points=transform.normalizePoints(points);
    points=transform.addDefaultPointData(points,pointData);
    

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


export function viewportPipelineHelper(options={}){
    const {
        pointsAngle=0,
        viewportAngle=0,
        defaultPointData,
        pointSource,
    }=options;
    let rawPoints;
    if(typeof pointSource==="function"){
        rawPoints=pointSource(options);
    }else if(Array.isArray(pointSource)){
        rawPoints=pointSource;
    }
    else{
        rawPoints=shapes.genPoints(options);
    }

    return transform.rotateViewport(
        convert.viewportToString(
        convert.pointsToViewport(
        transform.rotatePoints2D(rawPoints,pointsAngle)
        ,options
        )
    ),
        viewportAngle,
        defaultPointData);
}