"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TransportManifest_sourceTile, _TransportManifest_transport, _TransportManifest_unit;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportManifest = void 0;
class TransportManifest {
    constructor(transport, unit, sourceTile) {
        _TransportManifest_sourceTile.set(this, void 0);
        _TransportManifest_transport.set(this, void 0);
        _TransportManifest_unit.set(this, void 0);
        __classPrivateFieldSet(this, _TransportManifest_transport, transport, "f");
        __classPrivateFieldSet(this, _TransportManifest_unit, unit, "f");
        __classPrivateFieldSet(this, _TransportManifest_sourceTile, sourceTile, "f");
    }
    sourceTile() {
        return __classPrivateFieldGet(this, _TransportManifest_sourceTile, "f");
    }
    transport() {
        return __classPrivateFieldGet(this, _TransportManifest_transport, "f");
    }
    unit() {
        return __classPrivateFieldGet(this, _TransportManifest_unit, "f");
    }
}
exports.TransportManifest = TransportManifest;
_TransportManifest_sourceTile = new WeakMap(), _TransportManifest_transport = new WeakMap(), _TransportManifest_unit = new WeakMap();
exports.default = TransportManifest;
//# sourceMappingURL=TransportManifest.js.map