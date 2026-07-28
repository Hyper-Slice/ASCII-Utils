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
