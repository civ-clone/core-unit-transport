"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.TransportRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const TransportManifest_1 = require("./TransportManifest");
class TransportRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(TransportManifest_1.default);
    }
    getByTransport(transport) {
        return this.getBy('transport', transport);
    }
    getByUnit(unit) {
        const manifests = this.getBy('unit', unit);
        if (manifests.length !== 1) {
            throw new TypeError(`Wrong number of results.`);
        }
        return manifests[0];
    }
}
exports.TransportRegistry = TransportRegistry;
exports.instance = new TransportRegistry();
exports.default = TransportRegistry;
//# sourceMappingURL=TransportRegistry.js.map