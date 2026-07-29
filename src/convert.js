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
// takes a list of values can be negative or positive then renders them in ascii in a array of lines (FUTURE! points{x,y} might make this work by taking in a value list and placing chars at the points in the output instead of doing max value then just building from that)
//NOTE! yoffset is added if values are negative so the smallest number will always be the at line index 0 
export function valueArrayToAscii(lengths,priChar='*',secChar='-',primaryDelimAmount=1){
    let yOffset=0;
    let maxVal=0;
    let rows=[];
    // finding yoffset value when x and if x value goes negative 
    for (let index = 0; index < lengths.length; index++) {
        const number = lengths[index];
        const absNumber=Math.abs(Math.round(number));
        if(absNumber>yOffset&&number<0){
            yOffset=absNumber;
        }
        if(absNumber>=maxVal){
            maxVal=absNumber;
        }
    }
    for (let index = 0; index < lengths.length; index++) {
        const element = lengths[index];

            rows.push(secChar.repeat(element+yOffset+1)+priChar.repeat(primaryDelimAmount));
    }
            
    return rows.map(element=>{
            return element+priChar.repeat(Math.abs(maxVal+yOffset-element.length+2));
    })
}
