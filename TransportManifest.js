"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportManifest = void 0;
const DataObject_1 = require("@civ-clone/core-data-object/DataObject");
/**
 * One unit aboard one transport, and now an entity.
 *
 * It was a plain class, which `EntityRegistry` accepts happily, but
 * `core-save-game` discovers entities by walking `DataObject`s, so a manifest
 * was invisible to a save. A loaded game had every unit aboard a ship or a
 * Carrier back on the map with its `Stowed` busy rule and nothing carrying it:
 * the ship sailed without it, and an aircraft was lost at the next fuel check
 * (civ-clone/web-renderer#81). `StrategyNote` went through the same change.
 *
 * All three fields are entities, so each is saved as a `$ref` and comes back as
 * the restored instance.
 */
class TransportManifest extends DataObject_1.DataObject {
    constructor(transport, unit, sourceTile) {
        super();
        this._transport = transport;
        this._unit = unit;
        this._sourceTile = sourceTile;
        this.addKey('sourceTile', 'transport', 'unit');
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