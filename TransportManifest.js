"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _transport, _unit;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportManifest = void 0;
class TransportManifest {
    constructor(transport, unit) {
        _transport.set(this, void 0);
        _unit.set(this, void 0);
        __classPrivateFieldSet(this, _transport, transport);
        __classPrivateFieldSet(this, _unit, unit);
    }
    transport() {
        return __classPrivateFieldGet(this, _transport);
    }
    unit() {
        return __classPrivateFieldGet(this, _unit);
    }
}
exports.TransportManifest = TransportManifest;
_transport = new WeakMap(), _unit = new WeakMap();
exports.default = TransportManifest;
//# sourceMappingURL=TransportManifest.js.map