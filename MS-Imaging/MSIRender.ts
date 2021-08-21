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

    renderRGB(r: number, g: number, b: number, da: number = 0.1, scale = [5, 5], target: string = "#ms-imaging") {
        const R = this.loadLayer(r, da);
        const G = this.loadLayer(g, da);
        const B = this.loadLayer(b, da);

        console.log("red layer:");
        console.log(R);
        console.log("green layer:");
        console.log(G);
        console.log("blue layer:");
        console.log(B);

        const width = this.dimension.w * scale[0];
        const height = this.dimension.h * scale[1];
        const svg = new Graphics($ts(target)).size(width, height);

        for (let p of this.MergeLayers(R, G, B)) {
            const rect = new Canvas.Rectangle((p.x - 1) * scale[0], (p.y - 1) * scale[1], scale[0], scale[1]);
            const color = new Canvas.Color(p.color[0], p.color[1], p.color[2]);
            const border = new Canvas.Pen(color, 1);

            svg.drawRectangle(rect, border, color);
        }

        console.log(svg);
    }

    private MergeLayers(r: PixelData[], g: PixelData[], b: PixelData[]) {
        const layer: { x: number, y: number, color: number[] }[] = [];

        for (let x: number = 1; x <= this.dimension.w; x++) {
            const rx = $from(r).Where(p => p.x == x);
            const gx = $from(g).Where(p => p.x == x);
            const bx = $from(b).Where(p => p.x == x);

            for (let y: number = 1; y <= this.dimension.h; y++) {
                const cr = rx.Where(p => p.y == y).FirstOrDefault()?.level || 0;
                const cg = gx.Where(p => p.y == y).FirstOrDefault()?.level || 0;
                const cb = bx.Where(p => p.y == y).FirstOrDefault()?.level || 0;

                layer.push({ x: x, y: y, color: [cr, cg, cb] });
            }
        }

        return layer;
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