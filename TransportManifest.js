"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportManifest = void 0;
class TransportManifest {
    constructor(transport, unit, sourceTile) {
        this._transport = transport;
        this._unit = unit;
        this._sourceTile = sourceTile;
    }
    sourceTile() {
        return this._sourceTile;
    }
    transport() {
        return this._transport;
    }
    unit() {
        return this._unit;
    }
}
exports.TransportManifest = TransportManifest;
exports.default = TransportManifest;
//# sourceMappingURL=TransportManifest.js.map