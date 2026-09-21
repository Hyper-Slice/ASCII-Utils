// convert  imgs source arrays to img ascii arrays
export async function imgListToPoints(options={}){
    const {
        imgSources=[],
    }=options;

    let pointArray=[];
    for (let index = 0; index < imgSources.length; index++) {
        const source = imgSources[index];
        await loadImg(img,source);
        let points=imageToPoint(options);
        pointArray.push(points); 
}
return pointArray;
}

// async img loading
export async function loadImg(img,imgSource) {

    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imgSource;

    });
}

//takes a img html element and a  canvas element to extract img data and turn it into points with point
export function imageToPoint(options= {}){

    const {
        img,
        canvas,
        widthFactor = 2,
        scaleFactor = 0.3,
    } = options;

    const canvasContext = canvas.getContext('2d');

    // scaling canvas by factors 
    canvas.width=Math.floor(img.width*scaleFactor*widthFactor);
    canvas.height=Math.floor(img.height*scaleFactor);

    canvasContext.drawImage(img, 0, 0, canvas.width, canvas.height)

    //getting the img data as pixel values in a interval of 4

    const rawImageData= canvasContext.getImageData(0,0,canvas.width,canvas.height).data;

    //switched from a string to an array 
    const points=[];

    
    let rgba=[];
    for (let y = 0; y < canvas.height; y++) {
        let lineOffset=y * canvas.width * 4;
        for(let x= 0; x<canvas.width*4;x+=4){  
        rgba=[rawImageData[lineOffset+x],rawImageData[lineOffset+x+1],rawImageData[lineOffset+x+2],rawImageData[lineOffset+x+3]];
        points.push([x/4,y,{rgba}]);
        }
    }

    return points;
}
