export function parabolaValues(options={}){
    //parabola function y=ax^2+bx+c removed bx and c for simplicity (not needed, not a graph just the shape)
    const {
        a=-0.3,
        b=0,
        c=0,
        planeSize=20,
    } = options

    const values=[];// the plane rotated is by 90 degrees so the x axis becomes y etc
    const planeStride=planeSize/2;

    //generate graph values
    for (let x = (-1*planeStride); x <= planeStride; x++) {
        let y=(a * x ** 2)+(b*x)+c;
        values.push(y);
    }
    return(values);
}

export function sinValues(options={}){
    const {
        a: frequency=0.1,// between 0 and 1 might scale using sigmoid 
        b: amplitude=10,
        c: offset=8,
        planeSize=200,
    } = options

    const values=[];// the plane rotated is by 90 degrees so the x axis becomes y etc
    const planeStride=planeSize/2;

    //generate graph values
    for (let x = (-1*planeStride); x <= planeStride; x++) {
        let y=(Math.sin(x*frequency)*amplitude)+offset;
        values.push(y);
    }
    return(values);
}