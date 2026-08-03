//takes a img html element and a  canvas element to extract img data and turn it into ascii
export function imageToAscii(img,canvas,options= {}){

    const {
        widthFactor = 2,
        scaleFactor = 0.3,
        charPrimary = '*',
        charSecondary = '-',
        charTertiary =' ',
        brightnessThreshold = 480
    } = options;

    const canvasContext = canvas.getContext('2d');

    // scaling canvas by factors 
    canvas.width=Math.floor(img.width*scaleFactor*widthFactor);
    canvas.height=Math.floor(img.height*scaleFactor);

    canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height)

    //getting the img data as pixel values in a interval of 4

    const rawImageData= canvasContext.getImageData(0,0,canvas.width,canvas.height).data;

    //switched from a string to an array 
    const pixelArray=[];

    //setting vars
    const halfBrightness=brightnessThreshold/2
    let r,g,b;
    let brightness;

    //line count separation 
    let lineLength=canvas.width*4;
    const trueLength=lineLength;
    
    
    for(let i=0;i<rawImageData.length;i+=4){

        // canvas length and index and then add newline char
        // new line selection, skipped the boring nested for loops- 
        // for(ehehe get it) a if approach for the challenge (remove pun?)

         if((i===lineLength)){
            pixelArray.push('\n');
           lineLength+=trueLength;
        }

        // extracting the raw data in intervals of 4, skipping alpha value 
        // getting a simple rgb brightness value
        brightness=(rawImageData[i]+rawImageData[i+1]+rawImageData[i+2])

        // adding the chars where brightness is above set value(detail is lost on purpose ) 
        if (brightness>=brightnessThreshold){
            pixelArray.push(charPrimary);
        }
        else if(brightness>=halfBrightness){
            pixelArray.push(charSecondary)
        }
        else{
            pixelArray.push(charTertiary);
        }

    }
    return pixelArray.join('');
}

//takes in a list of points outputs a viewport scaled version.
export function PointsToAscii(points,options={}){
    const {
        length=20,
        width=40,
        primaryCharacter='*',
        secondaryCharacter='-',
    }=options;

    points=normalizePoints(points);

    let ViewPort=[];

    for (let i= 0; i < length; i++) {
        ViewPort.push(new Array(width).fill(secondaryCharacter));
    }
    points.forEach(point=>{
        const x=Math.abs(Math.round(point[0]*(width-1)));
        const y=Math.abs(Math.round(point[1]*(length-1)));
        ViewPort[y][x]=primaryCharacter;
    });
    return ViewPort.map(row => row.join('')).join('\n'); 
}


//finds the minimum x and y value as well as the maximum x and y value returns an array containing these values
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

//goes trough a point list and pushes all points into the positive quadrant by adding the abs of the smallest x and y value to each point
export function offsetPoints(points,bounds){

    const [xMax,xMin,yMax,yMin]=bounds;

    const xOffset=Math.abs(xMin);
    const yOffset=Math.abs(yMin);

    return points.map(point=>{
        return [point[0]+xOffset,point[1]+yOffset];
    });
} 

//converts points to a 0% to 100% scale 
export function normalizePoints(points){

    const bounds = getBounds(points);
    let [xMax, xMin, yMax, yMin] = bounds;

    points=offsetPoints(points,bounds);
    xMax=xMax+Math.abs(xMin);
    yMax=yMax+Math.abs(yMin);
    return points.map(point=>{
        const normalPointX = xMax === 0 ? 0 : point[0] / xMax;
        const normalPointY = yMax === 0 ? 0 : point[1] / yMax;
        return [normalPointX,normalPointY];
    });
}