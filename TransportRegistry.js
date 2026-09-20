"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.TransportRegistry = void 0;
const EntityRegistry_1 = require("@civ-clone/core-registry/EntityRegistry");
const TransportManifest_1 = require("./TransportManifest");
class TransportRegistry extends EntityRegistry_1.EntityRegistry {
    constructor() {
        super(TransportManifest_1.default);
        // A manifest's unit and transport are fixed for its lifetime — stowing
        // registers one and unloading unregisters it — so neither key can go stale
        // under a live registration and neither needs a `reindex`.
        this._byTransport = this.index((manifest) => manifest.transport());
        this._byUnit = this.index((manifest) => manifest.unit());
    }
    getByTransport(transport) {
        return this._byTransport.get(transport);
    }
    getByUnit(unit) {
        const manifests = this._byUnit.get(unit);
        if (manifests.length !== 1) {
            throw new TypeError(`Wrong number of results. (${manifests.length})`);
        }
        return manifests[0];
    }
    /**
     * Is this unit aboard anything?
     *
     * `getByUnit` throws when the answer is no, so asking it that question costs
     * a thrown `TypeError` — and callers did ask, inside a `try`/`catch`, for
     * every unit on every move. A 150-turn game spent 23% of its time in
     * `getByUnit`, almost all of it answering "no" the expensive way.
     */
    hasUnit(unit) {
        return this._byUnit.has(unit);
    }
}
exports.TransportRegistry = TransportRegistry;
exports.instance = new TransportRegistry();
exports.default = TransportRegistry;
//# sourceMappingURL=TransportRegistry.js.map