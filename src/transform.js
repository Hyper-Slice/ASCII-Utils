
//ascii transforms
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

export function reverseString(string,delim=''){
    return Array.from(string).reverse().join(delim);
}

//Rewrote no AI yay i keep my job :)
export function replaceStringStart(lines,priChar=' ',indexChar='*',stopBefore=0) {

    return lines.map((currentLine) => {
        let charIndex=currentLine.indexOf(indexChar);
        charIndex-=stopBefore;

        if(charIndex<0){return currentLine}
        return priChar.repeat(charIndex)+currentLine.slice(charIndex,currentLine.length);
    });
}
// point transforms
export function transposePoints2D(points){
    for (let index = 0; index < points.length; index++) {
        const point = points[index];
        let temp=point[0];
        point[0]=point[1];
        point[1]=temp;
    }
    return points
}

export function rotatePoints2D(points,angle){
    const degrees=angle*(Math.PI/180)
    return points.map(point=>{
        const x=point[0];
        const y=point[1];
        const xRotated=(x*Math.cos(degrees))+(y*Math.sin(degrees));
        const yRotated=((-1*x)*Math.sin(degrees))+(y*Math.cos(degrees));
        return [xRotated,yRotated];
        });
}