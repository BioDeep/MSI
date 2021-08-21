///<reference path="../dist/netcdf.d.ts" />

function loadNetCDF(url: string, render: (r: MSIRender) => void) {
    NetCDFReader.fetch(url, cdf => render(createMSIRender(cdf)));
}

function createMSIRender(cdf: NetCDFReader): MSIRender {

}