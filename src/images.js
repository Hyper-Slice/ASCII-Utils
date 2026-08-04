// convert  imgs source arrays to img ascii arrays
/**
 * @param {HTMLImageElement} img a img element
 * @param {HTMLCanvasElement} canvas a canvas element
 * @param {Array} imgSources a list of the image source locations eg "\file.png"
 * @returns {array} a array containing the ascii strings of all the images
 */
export async function convertImgToASCIIList(img,canvas,imgSources){
    let AsciiImgArray=[];
    for (let index = 0; index < imgSources.length; index++) {
        const element = imgSources[index];
        await loadImg(img,element);
        let asciiImage=convertImgToASCII(img,canvas,{charPrimary:'#'});
        AsciiImgArray.push(asciiImage); 
}
return AsciiImgArray;
}

// async img loading
/**
 * @param {HTMLImageElement} img the actual img element
 * @param {String} imgSource the string location of the img
 * @returns the img but loaded use with async
 */
export async function loadImg(img,imgSource) {

    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imgSource;

    });
}

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
        // for a if approach for the challenge (ehehe "for" get it)(remove pun?)

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
