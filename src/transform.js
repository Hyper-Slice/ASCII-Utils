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

//NOTE! ai generated will rewrite later and move to render
export function replaceStartAsterisk(lines, size, MainChar) {
    if (!Array.isArray(lines) || lines.length === 0) return [];

    return lines.map((currentLine) => {
        const CharIndex = currentLine.indexOf(MainChar);
        if (CharIndex === -1) return currentLine;
        
        const spaceCount = Math.max(0, CharIndex - size);
        const spaces = ' '.repeat(spaceCount);
        const remainingLine = currentLine.slice(spaceCount);
        
        return spaces + remainingLine;
    });
}