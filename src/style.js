//wraps substrings starting and ending with a delimiter in a html tag of choice 
//NOTE! not sanitization and only wraps the first group found ( might add more groups later using index arrays)
export function delimStringHTMLTagWrapper(string,delim,tag,cssParam,cssParamValue){
    let startInsertIndex=0;
    let endInsertIndex=0;
    let insertedTagStart=false;
    for (let index = 0; index < string.length; index++) {

        if(string[index]==delim&&insertedTagStart==false){
           startInsertIndex=index;
           insertedTagStart=true;
        }

        else if(string[index]==delim&&insertedTagStart==true){

            if(string[index+1]!=delim){
                endInsertIndex=index;
            }
        }
    }

    if(insertedTagStart==true&&endInsertIndex!=0){
        return string.slice(0,startInsertIndex)+`<${tag} ${cssParam}="${cssParamValue}">`+string.slice(startInsertIndex,endInsertIndex+1)+`</${tag}>`+string.slice(endInsertIndex+1);
    }
    return string;
}