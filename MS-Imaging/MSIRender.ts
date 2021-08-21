class MSIRender {

    dimension: { w: number, h: number };
    pixels: Pixel[];
    mz: number[];

    constructor(pixels: Pixel[], w: number, h: number) {
        this.pixels = pixels;
        this.dimension = { w: w, h: h };
    }

    renderMz(mz: number, da: number = 0.1, target = "#ms-imaging") {
        const layer = this.loadLayer(mz, da);
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