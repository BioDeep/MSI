interface IRenderOptions {

    da: number;
    scale: number[];
    target: string;
    handlePixel: ClickPixel;
    colorSet: string[];

}

const PuBuGn = ["rgb(255,247,251)", "rgb(236,226,240)", "rgb(208,209,230)", "rgb(166,189,219)", "rgb(103,169,207)", "rgb(54,144,192)", "rgb(2,129,138)", "rgb(1,108,89)", "rgb(1,70,54)"];

function RenderOptions(
    da: number = 0.1,
    scale = [5, 5],
    colorSet: string[] = PuBuGn,
    target: string = "#ms-imaging",
    handlePixel: ClickPixel = null) {

    if (isNullOrUndefined(scale)) scale = [5, 5];

    return <IRenderOptions>{
        da: da,
        scale: scale,
        colorSet: colorSet,
        target: target,
        handlePixel: handlePixel
    };
}