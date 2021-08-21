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
    readonly mz: number[];
    constructor(mz: number[], pixels: Pixel[], w: number, h: number);
    renderMz(mz: number, opts?: IRenderOptions): void;
    renderRGB(r: number, g: number, b: number, opts?: IRenderOptions): void;
    FindPixel(x: number, y: number): Pixel;
    private MergeLayers;
    private static level;
    loadLayer(mz: number, da: number, levels: number, cut: number[]): PixelData[];
    static PixelValue(pixel: Pixel, mz: number, da: number): number;
}
interface IRenderOptions {
    da: number;
    scale: number[];
    target: string;
    handlePixel: ClickPixel;
    colorSet: string[];
    range: number[];
}
declare const Jet: string[];
declare function RenderOptions(da?: number, scale?: number[], colorSet?: string[], target?: string, handlePixel?: ClickPixel, range?: number[]): IRenderOptions;
declare function loadNetCDF(url: string, render: (r: MSIRender) => void): void;
declare function createMSIRender(cdf: NetCDFReader, mzErr?: number): MSIRender;
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
