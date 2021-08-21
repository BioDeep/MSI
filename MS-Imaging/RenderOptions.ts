interface IRenderOptions {

    da: number;
    scale: number[];
    target: string;
    handlePixel: ClickPixel;
    colorSet: number[][];

}

const PuBuGn = [
    [255, 247, 251],
    [236, 226, 240],
    [208, 209, 230],
    [166, 189, 219],
    [103, 169, 207],
    [54, 144, 192],
    [2, 129, 138],
    [1, 108, 89],
    [1, 70, 54]
];

function RenderOptions(
    da: number = 0.1,
    scale = [5, 5],
    colorSet: number[][] = PuBuGn,
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