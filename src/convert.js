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
//FIX!! sometimes breaks on random values for no reason also fix render direction also split to sub functions for specific tasks
//takes a list of points and plots them NOTE! negative values will be pushed so that all values are positive by taking the smallest values absolute and adding it to all the points for x and y
export function PointsToAscii(points,priChar='*',secChar='-'){
  let yOffset=0;
  let xOffset=0;

  let yMax=0;
  let xMax=0;
  // getting plane size and x and y offsets to push all numbers into the positive plane
  console.log(points);
  for (let index = 0; index < points.length; index++) {
    const point = points[index];
    let x=Math.round(point[0]);
    let y=Math.round(point[1]);
    if(x<xOffset){
        xOffset=x;
    }
    if(y<yOffset){
        yOffset=y;
    }
    if(x>xMax){
        xMax=x;
    }
    if(y>yMax){
        yMax=y;
    }
    points[index]=[x,y];
  }
  //console.log(points);
  yOffset=Math.abs(yOffset);
  xOffset=Math.abs(xOffset);
  yMax=yMax+yOffset+1;
  xMax=xMax+xOffset+1;
  //console.log(yOffset,xOffset,yMax,xMax);
  let plane=[]
  for (let i = 0; i < yMax; i++) {
  plane.push(new Array(xMax).fill(secChar));
}
console.log(plane);
for (let i = 0; i < points.length; i++) {
    const point = points[i];
    let x=point[0]+xOffset;
    let y=point[1]+yOffset;
    if(isNaN(x)||isNaN(y)){
        continue;
    }
    else{plane[y][x]=priChar;}
    
}
    return plane.map(row => row.join('')).join('\n');
}