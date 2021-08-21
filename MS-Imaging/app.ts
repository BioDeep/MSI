///<reference path="../dist/netcdf.d.ts" />

function loadNetCDF(url: string, render: (r: MSIRender) => void) {
    NetCDFReader.fetch(url, cdf => render(createMSIRender(cdf)));
}

function createMSIRender(cdf: NetCDFReader): MSIRender {
    const mz: number[] = <any>cdf.getDataVariable("mz");
    const intensity: number[] = <any>cdf.getDataVariable("intensity");
    const x: number[] = <any>cdf.getDataVariable("x");
    const y: number[] = <any>cdf.getDataVariable("y");
    const pts = mz.map(function (mzi, i) {
        [mzi, intensity[i], x[i], y[i]];
    });


}