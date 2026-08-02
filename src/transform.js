
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
export function transposePoints(points){
    for (let index = 0; index < points.length; index++) {
        const point = points[index];
        let temp=point[0];
        point[0]=point[1];
        point[1]=temp;
    }
    return points
}

//FUTURE! implement a line connecting algorithm for points that are far apart
/* notes:
    (might just skip the connector lowkey and just fix the problem by changing step size but ill leave the idea here if need it )
    basic concept for the line connector
    find points next to each other on a edge probs via x stepping but need to consider if points are on 
    the y direction too aka build a edge finder like no two lines connecting any pont pay cross so just
     edge points work might use some circles for this 
    then find delta in y or x create points that are stepped by one in the deltas till the two points are connected 
    given x=1 and y=1 we step like this x+1 until x+1>=x delta also step in y till the same is true we just stop stepping in a direction of we reach the delta value 
*/