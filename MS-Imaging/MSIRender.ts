class MSIRender {

    dimension: { w: number, h: number };
    pixels: Pixel[];

    constructor(pixels: Pixel[], w: number, h: number) {
        this.pixels = pixels;
        this.dimension = { w: w, h: h };
    }

    renderMz(mz: number, da: number = 0.1, target = "#ms-imaging") {

    }
}