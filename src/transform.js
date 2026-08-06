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

//rotates points based on a angle given in degrees(NOTE! rotating the points means that the viewport will autoscale the points to fit the rotated version)

export function rotatePoints2D(points,angle){

    const degrees=angle*(Math.PI/180);

    return points.map(point=>{
        const x=point[0];
        const y=point[1];
        point[0]=(x*Math.cos(degrees))+(y*Math.sin(degrees));
        point[1]=((-1*x)*Math.sin(degrees))+(y*Math.cos(degrees));
        return point;
        });
}

//normalizes points to a 0-1 scale
export function normalizePoints(points){

    const bounds = getBounds(points);
    let [xMax, xMin, yMax, yMin] = bounds;
    
    const xOffset=Math.abs(xMin);
    const yOffset=Math.abs(yMin);

    points=offsetPoints(points,xOffset,yOffset);

    xMax=xMax+xOffset;
    yMax=yMax+yOffset;

    return points.map(point=>{
        point[0] = xMax === 0 ? 0 : point[0] / xMax;
        point[1] = yMax === 0 ? 0 : point[1] / yMax;
        return point;
    });
}

//moves a set of points by a offset
export function offsetPoints(points,xOffset,yOffset){
    return points.map(point=>{
        point[0]+=xOffset;
        point[1]+=yOffset;
        return point
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



//viewport transforms 


export function rotateViewport(viewport,angle,defaultPointData={}){
    const {
         emptyPointData={
            char:" ",
        },
    }=defaultPointData;


    let newViewport = viewport.map(row => 
    Array.from({ length: row.length }, () => ({ ...emptyPointData }))
    );

    const degrees=angle*(Math.PI/180);

    let wPivot=(viewport[0].length-1)/2
    let hPivot=(viewport.length-1)/2
    for (let height = 0; height < viewport.length-1; height++) {
        const row = viewport[height];  

        for (let width = 0; width < row.length-1; width++) {
            const point = row[width];

            let rotatedWidth=((width-wPivot)*Math.cos(degrees))+((height-hPivot)*Math.sin(degrees));
            let rotatedHeight=((-1*(width-wPivot))*Math.sin(degrees))+((height-hPivot)*Math.cos(degrees));
            rotatedWidth=Math.round(rotatedWidth+wPivot);
            rotatedHeight=Math.round(rotatedHeight+hPivot);
            if(rotatedWidth>0&&rotatedHeight>0){

                if(rotatedWidth<row.length&&rotatedHeight<viewport.length){
                newViewport[rotatedHeight][rotatedWidth]=point;
                }
            }
        }
            
    }
    return newViewport;
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