class MSIRender {

    dimension: { w: number, h: number };
    pixels: Pixel[];
    mz: number[];

    constructor(mz: number[], pixels: Pixel[], w: number, h: number) {
        this.pixels = pixels;
        this.dimension = { w: w, h: h };
        this.mz = mz;
    }

    renderMz(mz: number, da: number = 0.1, target = "#ms-imaging") {
        const layer = this.loadLayer(mz, da);
    }

    renderRGB(r: number, g: number, b: number, da: number = 0.1, target: string = "#ms-imaging") {
        const R = this.loadLayer(r, da);
        const G = this.loadLayer(g, da);
        const B = this.loadLayer(b, da);

        console.log("red layer:");
        console.log(R);
        console.log("green layer:");
        console.log(G);
        console.log("blue layer:");
        console.log(B);


    }

    loadLayer(mz: number, da: number) {
        const layer: PixelData[] = [];

        for (let pixel of this.pixels) {
            const intensity: number = MSIRender.PixelValue(pixel, mz, da);

            if (intensity > 0) {
                layer.push(<PixelData>{
                    x: pixel.x, y: pixel.y, intensity: intensity
                });
            }
        }

        const range = data.NumericRange.Create($from(layer).Select(p => p.intensity));
        const length: number = range.Length;

        for (let p of layer) {
            p.level = Math.round(255 * (p.intensity - range.min) / length);
        }

        return layer;
    }

    static PixelValue(pixel: Pixel, mz: number, da: number): number {
        let maxIntensity: number = 0;

        for (let i = 0; i < pixel.mz.length; i++) {
            if (Math.abs(pixel.mz[i] - mz) <= da) {
                if (pixel.intensity[i] > maxIntensity) {
                    maxIntensity = pixel.intensity[i];
                }
            }
        }

        return maxIntensity;
    }
}