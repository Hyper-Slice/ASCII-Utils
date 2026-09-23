import * as convert from "./convert.js";



export function captureAnimationFrames(options={}){
    const {
        animationRate,//the rate at which this parameter changes
        startValue,// the starting value
        stopValue,//the end value 
        animationParameter,//what you want animated eg rotation freq a b c d slope etc two types of rotation viewport and points
        animationCallback=convert.viewportPipelineHelper,
    }=options;
    let frames=[];
    for (let parameterValue = startValue; parameterValue <= stopValue; parameterValue+=animationRate) {
        frames.push(animationCallback({...options,[animationParameter]:parameterValue}));

    }
    return frames;
}  

export class animation{

    constructor(frames,fps,rewind,reset){
        this.frames=frames;
        this.interval=1000/fps;
        this.currentFrame=0;
        this.rewind=rewind;
        this.rewinding=false;
        this.reset=reset;
        this.previousTimeStamp=null;
        this.requestId=null;
    }

    start(sourceSetter){
        this.stop();
        const animate= (timeStamp)=>{

            if(this.previousTimeStamp===null){
                this.previousTimeStamp=timeStamp;
            }
            const elapsed =timeStamp-this.previousTimeStamp;

            if(elapsed >=this.interval){
                this.previousTimeStamp= timeStamp - (elapsed % this.frameInterval);
                const frame=this.frames[this.currentFrame];
                sourceSetter(frame);
            
                if(this.reset){
                    this.currentFrame= (this.currentFrame+1)% this.frames.length;
                }

                if(this.rewind){
                    if(this.currentFrame>=this.frames.length){
                        this.rewinding=true;
                    }
                    else if(this.currentFrame<=0){
                        this.rewinding=false;
                    }
                    if(this.rewinding){
                        this.currentFrame--;
                    }
                    if(!this.rewinding){
                        this.currentFrame++;
                    }
     
                }
            }
            this.requestId=requestAnimationFrame(animate);

        };
        this.requestId=requestAnimationFrame(animate);
    }

    stop(){
        if(this.requestId){
            cancelAnimationFrame(this.requestId);
            this.requestId=null;
            this.previousTimeStamp=null;
        }
    }
}

export function loadJsonAnimation(JsonAnimation){
    try {
        return JSON.parse(JsonAnimation);
    } catch (error) {
        console.error("Load failed:[json to animation]:"+error);
    }
}

export function animationToJson(animation){
    try {
    
        return JSON.stringify(animation,null,2);
    
    } catch (error) {
    
        console.error("conversion failed:[animation to json]:"+error);
    
    }

}

export function loadJsonAnimationFile(JsonAnimation,filename="animation.json"){
    
    const json= loadJsonAnimation(JsonAnimation);
    const blob= new Blob([json],{type:'application/json'});
    const link=document.createElement('a');
    
    link.href= URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.remove(link);
    URL.revokeObjectURL(link.href);
}

