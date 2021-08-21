var MSIRender = /** @class */ (function () {
    function MSIRender(pixels, w, h) {
        this.pixels = pixels;
        this.dimension = { w: w, h: h };
    }
    MSIRender.prototype.renderMz = function (mz, da, target) {
        if (da === void 0) { da = 0.1; }
        if (target === void 0) { target = "#ms-imaging"; }
    };
    return MSIRender;
}());
///<reference path="../dist/netcdf.d.ts" />
///<reference path="../dist/linq.d.ts" />
///<reference path="../dist/svg.d.ts" />
function loadNetCDF(url, render) {
    NetCDFReader.fetch(url, function (cdf) { return render(createMSIRender(cdf)); });
}
function createMSIRender(cdf) {
    var mz = cdf.getDataVariable("mz");
    var intensity = cdf.getDataVariable("intensity");
    var x = cdf.getDataVariable("x");
    var y = cdf.getDataVariable("y");
    var pts = mz.map(function (mzi, i) {
        return [mzi, intensity[i], x[i], y[i]];
    });
    var pixels = $from(pts)
        .GroupBy(function (a) { return a[2] + "-" + a[3]; })
        .Select(function (mzlist) {
        return {
            x: mzlist.ElementAt(0)[2],
            y: mzlist.ElementAt(0)[3],
            mz: mzlist.Select(function (i) { return i[0]; }).ToArray(),
            intensity: mzlist.Select(function (i) { return i[1]; }).ToArray()
        };
    })
        .ToArray();
    var w = parseInt(cdf.getAttribute("width").toString());
    var h = parseInt(cdf.getAttribute("height").toString());
    return new MSIRender(pixels, w, h);
}
var mzPack = /** @class */ (function () {
    function mzPack() {
    }
    return mzPack;
}());
//# sourceMappingURL=ms-imaging.js.map