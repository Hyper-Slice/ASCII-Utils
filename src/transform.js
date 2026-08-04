//string transforms


//flips ascii arrays around (supposed to be used with prerender ascii )
export function transposeStringArray(array){
    let invArray=[];
    for (let x = 0; x < array[0].length; x++) {
            let invString='';

        for (let y = 0; y < array.length; y++) {
            invString+=array[y][x];
        }
        invArray.push(invString)
    }
    return invArray;
 }
// reverses a string and joins back up using a provided delim
export function reverseString(string,delim=''){
    return Array.from(string).reverse().join(delim);
}

//replaces the start a string array by delim position 
export function replaceStringStart(lines,priChar=' ',indexChar='*',stopBefore=0) {

    return lines.map((currentLine) => {
        let charIndex=currentLine.indexOf(indexChar);
        charIndex-=stopBefore;

        if(charIndex<0){return currentLine}
        return priChar.repeat(charIndex)+currentLine.slice(charIndex,currentLine.length);
    });
}


// point transforms


// transposes point x and y swaps 
export function transposePoints2D(points){
    for (let index = 0; index < points.length; index++) {
        const point = points[index];
        let temp=point[0];
        point[0]=point[1];
        point[1]=temp;
    }
    return points
}

//rotates points based on a angle given in degrees
export function rotatePoints2D(points,angle){
    const degrees=angle*(Math.PI/180)
    return points.map(point=>{
        const x=point[0];
        const y=point[1];
        point[0]=(x*Math.cos(degrees))+(y*Math.sin(degrees));
        point[1]=((-1*x)*Math.sin(degrees))+(y*Math.cos(degrees));
        return point;
        });
}

//goes trough a point list and pushes all points into the positive quadrant by adding the abs of the smallest x and y value to each point
export function offsetPoints(points,bounds){

    const [xMax,xMin,yMax,yMin]=bounds;

    const xOffset=Math.abs(xMin);
    const yOffset=Math.abs(yMin);

    return points.map(point=>{
        point[0]=point[0]+xOffset;
        point[1]=point[1]+yOffset;
        return point;
    });
} 

//normalizes points to a 0-1 scale 
export function normalizePoints(points){

    const bounds = getBounds(points);
    let [xMax, xMin, yMax, yMin] = bounds;

    points=offsetPoints(points,bounds);
    xMax=xMax+Math.abs(xMin);
    yMax=yMax+Math.abs(yMin);
    return points.map(point=>{
        point[0] = xMax === 0 ? 0 : point[0] / xMax;
        point[1] = yMax === 0 ? 0 : point[1] / yMax;
        return point;
    });
}

//adds a default pointData value to points [x,y,pointData]
export function addDefaultPointData(points,pointData={}){
    const {
        char='*',
    }=pointData;

    return points.map(point=>{
        //if point data already exists don't do anything if not add default point data
        return point.length > 2 ? point : [point[0],point[1],{...pointData}];
    });
}

//helper functions


//finds the minimum x and y value as well as the maximum x and y value returns an array containing these values 
//[xMax,xMin,yMax,Ymin]
export function getBounds(points){

    let yMin=0;
    let xMin=0;
    let yMax=0;
    let xMax=0;

    points.forEach(point => {
        let x=point[0];
        let y=point[1];

        if(x<xMin){xMin=x;}
        if(y<yMin){yMin=y;}
        if(x>xMax){xMax=x;}
        if(y>yMax){yMax=y;}
    
    });


//       0    1    2    3
return [xMax,xMin,yMax,yMin]
}