var MSIRender = /** @class */ (function () {
    function MSIRender(mz, pixels, w, h) {
        this.pixels = pixels;
        this.dimension = { w: w, h: h };
        this.mz = mz;
    }
    MSIRender.prototype.renderMz = function (mz, opts) {
        if (opts === void 0) { opts = RenderOptions(); }
        var layer = this.loadLayer(mz, opts.da, opts.colorSet.length);
        var scale = opts.scale;
        var width = this.dimension.w * scale[0];
        var height = this.dimension.h * scale[1];
        var svg = new Graphics($ts(opts.target)).size(width, height);
        var vm = this;
        var colorSet = opts.colorSet;
        var _loop_1 = function (p) {
            var rect = new Canvas.Rectangle((p.x - 1) * scale[0], (p.y - 1) * scale[1], scale[0], scale[1]);
            var color = new Canvas.Color(colorSet[p.level][0], colorSet[p.level][1], colorSet[p.level][2]);
            var border = new Canvas.Pen(color, 1);
            svg.drawRectangle(rect, border, color, function () {
                var pixel = vm.FindPixel(p.x, p.y);
                if (opts.handlePixel) {
                    opts.handlePixel(pixel);
                }
            });
        };
        for (var _i = 0, layer_1 = layer; _i < layer_1.length; _i++) {
            var p = layer_1[_i];
            _loop_1(p);
        }
    };
    MSIRender.prototype.renderRGB = function (r, g, b, opts) {
        if (opts === void 0) { opts = RenderOptions(); }
        var R = this.loadLayer(r, opts.da);
        var G = this.loadLayer(g, opts.da);
        var B = this.loadLayer(b, opts.da);
        console.log("red layer:");
        console.log(R);
        console.log("green layer:");
        console.log(G);
        console.log("blue layer:");
        console.log(B);
        var scale = opts.scale;
        var width = this.dimension.w * scale[0];
        var height = this.dimension.h * scale[1];
        var svg = new Graphics($ts(opts.target)).size(width, height);
        var vm = this;
        var _loop_2 = function (p) {
            var rect = new Canvas.Rectangle((p.x - 1) * scale[0], (p.y - 1) * scale[1], scale[0], scale[1]);
            var color = new Canvas.Color(p.color[0], p.color[1], p.color[2]);
            var border = new Canvas.Pen(color, 1);
            svg.drawRectangle(rect, border, color, function () {
                var pixel = vm.FindPixel(p.x, p.y);
                if (opts.handlePixel) {
                    opts.handlePixel(pixel);
                }
            });
        };
        for (var _i = 0, _a = this.MergeLayers(R, G, B); _i < _a.length; _i++) {
            var p = _a[_i];
            _loop_2(p);
        }
        console.log(svg);
    };
    MSIRender.prototype.FindPixel = function (x, y) {
        for (var _i = 0, _a = this.pixels; _i < _a.length; _i++) {
            var p = _a[_i];
            if (x == p.x && y == p.y) {
                return p;
            }
        }
        return { x: x, y: y, mz: null, intensity: null };
    };
    MSIRender.prototype.MergeLayers = function (r, g, b) {
        var layer = [];
        var _loop_3 = function (x) {
            var rx = $from(r).Where(function (p) { return p.x == x; });
            var gx = $from(g).Where(function (p) { return p.x == x; });
            var bx = $from(b).Where(function (p) { return p.x == x; });
            for (var y = 1; y <= this_1.dimension.h; y++) {
                var cr = MSIRender.level(rx, y);
                var cg = MSIRender.level(gx, y);
                var cb = MSIRender.level(bx, y);
                layer.push({ x: x, y: y, color: [cr, cg, cb] });
            }
        };
        var this_1 = this;
        for (var x = 1; x <= this.dimension.w; x++) {
            _loop_3(x);
        }
        return layer;
    };
    MSIRender.level = function (x, y) {
        var pixel = x.Where(function (p) { return p.y == y; }).FirstOrDefault();
        if (isNullOrUndefined(pixel)) {
            return 0;
        }
        else {
            return pixel.level;
        }
    };
    MSIRender.prototype.loadLayer = function (mz, da, levels) {
        if (levels === void 0) { levels = 255; }
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
        for (var _b = 0, layer_2 = layer; _b < layer_2.length; _b++) {
            var p = layer_2[_b];
            p.level = Math.round(levels * (p.intensity - range.min) / length);
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
var PuBuGn = [
    [255, 247, 251],
    [236, 226, 240],
    [208, 209, 230],
    [166, 189, 219],
    [103, 169, 207],
    [54, 144, 192],
    [2, 129, 138],
    [1, 108, 89],
    [1, 70, 54]
];
function RenderOptions(da, scale, colorSet, target, handlePixel) {
    if (da === void 0) { da = 0.1; }
    if (scale === void 0) { scale = [5, 5]; }
    if (colorSet === void 0) { colorSet = PuBuGn; }
    if (target === void 0) { target = "#ms-imaging"; }
    if (handlePixel === void 0) { handlePixel = null; }
    if (isNullOrUndefined(scale))
        scale = [5, 5];
    return {
        da: da,
        scale: scale,
        colorSet: colorSet,
        target: target,
        handlePixel: handlePixel
    };
}
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