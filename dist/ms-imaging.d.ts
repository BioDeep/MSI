/// <reference path="netcdf.d.ts" />
/// <reference path="linq.d.ts" />
/// <reference path="svg.d.ts" />
declare class MSIRender {
    dimension: {
        w: number;
        h: number;
    };
    pixels: Pixel[];
    constructor(pixels: Pixel[], w: number, h: number);
    renderMz(mz: number, da?: number, target?: string): void;
}
declare function loadNetCDF(url: string, render: (r: MSIRender) => void): void;
declare function createMSIRender(cdf: NetCDFReader): MSIRender;
interface Pixel {
    x: number;
    y: number;
    mz: number[];
    intensity: number[];
}
declare class mzPack {
}
