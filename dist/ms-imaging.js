var MSIRender = /** @class */ (function () {
    function MSIRender(mz, pixels, w, h) {
        this.pixels = pixels;
        this.dimension = { w: w, h: h };
        this.mz = mz;
    }
    MSIRender.prototype.renderMz = function (mz, da, target) {
        if (da === void 0) { da = 0.1; }
        if (target === void 0) { target = "#ms-imaging"; }
        var layer = this.loadLayer(mz, da);
    };
    MSIRender.prototype.renderRGB = function (r, g, b, da, target) {
        if (da === void 0) { da = 0.1; }
        if (target === void 0) { target = "#ms-imaging"; }
        var R = this.loadLayer(r, da);
        var G = this.loadLayer(g, da);
        var B = this.loadLayer(b, da);
        console.log("red layer:");
        console.log(R);
        console.log("green layer:");
        console.log(G);
        console.log("blue layer:");
        console.log(B);
    };
    MSIRender.prototype.loadLayer = function (mz, da) {
        var layer = [];
        for (var _i = 0, _a = this.pixels; _i < _a.length; _i++) {
            var pixel = _a[_i];
            var intensity = MSIRender.PixelValue(pixel, mz, da);
            if (intensity > 0) {
                layer.push({
                    x: pixel.x, y: pixel.y, intensity: intensity
                });
            }
        }
        var range = data.NumericRange.Create($from(layer).Select(function (p) { return p.intensity; }));
        var length = range.Length;
        for (var _b = 0, layer_1 = layer; _b < layer_1.length; _b++) {
            var p = layer_1[_b];
            p.level = Math.round(255 * (p.intensity - range.min) / length);
        }
        return layer;
    };
    MSIRender.PixelValue = function (pixel, mz, da) {
        var maxIntensity = 0;
        for (var i = 0; i < pixel.mz.length; i++) {
            if (Math.abs(pixel.mz[i] - mz) <= da) {
                if (pixel.intensity[i] > maxIntensity) {
                    maxIntensity = pixel.intensity[i];
                }
            }
        }
        return maxIntensity;
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
    var uniqMz = $from(TypeScript.Data.group(mz, 0.1))
        .Select(function (i) { return i.Key; })
        .OrderBy(function (x) { return x; })
        .ToArray();
    return new MSIRender(uniqMz, pixels, w, h);
}
var mzPack = /** @class */ (function () {
    function mzPack() {
    }
    return mzPack;
}());
//# sourceMappingURL=ms-imaging.js.map