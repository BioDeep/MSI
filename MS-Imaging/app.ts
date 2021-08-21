///<reference path="../dist/netcdf.d.ts" />
///<reference path="../dist/linq.d.ts" />
///<reference path="../dist/svg.d.ts" />

function loadNetCDF(url: string, render: (r: MSIRender) => void) {
    NetCDFReader.fetch(url, cdf => render(createMSIRender(cdf)));
}

function createMSIRender(cdf: NetCDFReader): MSIRender {
    const mz: number[] = <any>cdf.getDataVariable("mz");
    const intensity: number[] = <any>cdf.getDataVariable("intensity");
    const x: number[] = <any>cdf.getDataVariable("x");
    const y: number[] = <any>cdf.getDataVariable("y");
    const pts = mz.map(function (mzi, i) {
        return [mzi, intensity[i], x[i], y[i]];
    });
    const pixels = $from(pts)
        .GroupBy(a => `${a[2]}-${a[3]}`)
        .Select(function (mzlist) {
            return <Pixel>{
                x: mzlist.ElementAt(0)[2],
                y: mzlist.ElementAt(0)[3],
                mz: mzlist.Select(i => i[0]).ToArray(),
                intensity: mzlist.Select(i => i[1]).ToArray()
            }
        })
        .ToArray();
    const w: number = parseInt(cdf.getAttribute("width").toString());
    const h: number = parseInt(cdf.getAttribute("height").toString());

    return new MSIRender(pixels, w, h);
}