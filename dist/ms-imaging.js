var MSIRender = /** @class */ (function () {
    function MSIRender() {
    }
    MSIRender.prototype.renderMz = function (mz, da, target) {
        if (da === void 0) { da = 0.1; }
        if (target === void 0) { target = "#ms-imaging"; }
    };
    return MSIRender;
}());
///<reference path="../dist/netcdf.d.ts" />
function loadNetCDF(url, render) {
    NetCDFReader.fetch(url, function (cdf) { return render(createMSIRender(cdf)); });
}
function createMSIRender(cdf) {
}
var mzPack = /** @class */ (function () {
    function mzPack() {
    }
    return mzPack;
}());
//# sourceMappingURL=ms-imaging.js.map