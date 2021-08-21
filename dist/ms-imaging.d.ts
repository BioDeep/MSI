/// <reference path="netcdf.d.ts" />
/// <reference path="linq.d.ts" />
/// <reference path="svg.d.ts" />
interface ClickPixel {
    (pixel: Pixel): void;
}
declare class MSIRender {
    dimension: {
        w: number;
        h: number;
    };
    pixels: Pixel[];
    mz: number[];
    constructor(mz: number[], pixels: Pixel[], w: number, h: number);
    renderMz(mz: number, da?: number, target?: string): void;
    renderRGB(r: number, g: number, b: number, da?: number, scale?: number[], target?: string, handlePixel?: ClickPixel): void;
    FindPixel(x: number, y: number): Pixel;
    private MergeLayers;
    private static level;
    loadLayer(mz: number, da: number): PixelData[];
    static PixelValue(pixel: Pixel, mz: number, da: number): number;
}
declare function loadNetCDF(url: string, render: (r: MSIRender) => void): void;
declare function createMSIRender(cdf: NetCDFReader): MSIRender;
interface Pixel {
    x: number;
    y: number;
    mz: number[];
    intensity: number[];
}
interface PixelData {
    x: number;
    y: number;
    intensity: number;
    level: number;
}
declare class mzPack {
}
