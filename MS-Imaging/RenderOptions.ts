interface IRenderOptions {

    da: number;
    scale: number[];
    target: string;
    handlePixel: ClickPixel;
    colorSet: string[];
    range: number[];

}

const Jet: string[] = [
    "#00007F",// dark blue
    "#0000FF",// blue
    "#007FFF",// azure
    "#00FFFF",// cyan
    "#7FFF7F",// light green
    "#FFFF00",// yellow
    "#FF7F00",// orange
    "#FF0000",// red
    "#7F0000" // dark red
];

function RenderOptions(
    da: number = 0.1,
    scale = [5, 5],
    colorSet: string[] = Jet,
    target: string = "#ms-imaging",
    handlePixel: ClickPixel = null,
    range: number[] = [0.2, 0.75]) {

    if (isNullOrUndefined(scale)) scale = [5, 5];

    return <IRenderOptions>{
        da: da,
        scale: scale,
        colorSet: colorSet,
        target: target,
        handlePixel: handlePixel,
        range: range
    };
}