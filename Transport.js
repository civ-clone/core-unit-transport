"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = exports.isTransport = void 0;
const Yields_1 = require("./Yields");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const TransportRegistry_1 = require("./TransportRegistry");
const Unit_1 = require("@civ-clone/core-unit/Unit");
const Stowed_1 = require("./Rules/Stowed");
const TransportManifest_1 = require("./TransportManifest");
const Unloaded_1 = require("./Rules/Unloaded");
const CanStow_1 = require("./Rules/CanStow");
const isTransport = (object) => {
    if (object instanceof Unit_1.Unit) {
        return [
            'canStow',
            'capacity',
            'cargo',
            'cargoWeight',
            'hasCapacity',
            'hasCargo',
            'stow',
            'unload',
        ].every((method) => typeof (object === null || object === void 0 ? void 0 : object[method]) === 'function');
    }
    if (object instanceof Function) {
        return [
            'canStow',
            'capacity',
            'cargo',
            'cargoWeight',
            'hasCapacity',
            'hasCargo',
            'stow',
            'unload',
        ].every((method) => typeof object.prototype[method] === 'function');
    }
    return false;
};
exports.isTransport = isTransport;
const Transport = (Base) => class Transport extends Base {
    constructor() {
        super(...arguments);
        // Named apart from `Unit`'s `_ruleRegistry`, which this shadowed as
        // `#ruleRegistry`. `Unit`'s is `private` and this one cannot be (TS4094 on
        // an exported class expression), and a public member cannot shadow a
        // private one of the same name. Renaming keeps the two slots separate, as
        // they were: `Unit` takes an injected registry, this always used the
        // singleton.
        this._transportRuleRegistry = RuleRegistry_1.instance;
        this._transportRegistry = TransportRegistry_1.instance;
    }
    canStow(unit) {
        return this._transportRuleRegistry
            .process(CanStow_1.default, this, unit)
            .every((result) => result);
    }
    capacity() {
        const [unitYield] = this.yield(new Yields_1.Capacity());
        return unitYield;
    }
    cargo() {
        return this._transportRegistry
            .getByTransport(this)
            .map((manifest) => manifest.unit());
    }
    cargoWeight() {
        const [unitYield] = this.yield(new Yields_1.CargoWeight());
        return unitYield;
    }
    hasCapacity() {
        return this.cargoWeight().value() < this.capacity().value();
    }
    hasCargo() {
        return (this._transportRegistry.getByTransport(this).length > 0);
    }
    // Ideally, these would be `protected`: https://github.com/microsoft/TypeScript/issues/30355
    setRuleRegistry(ruleRegistry) {
        this._transportRuleRegistry = ruleRegistry;
    }
    setTransportRegistry(transportRegistry) {
        this._transportRegistry = transportRegistry;
    }
    stow(unit, sourceTile = unit.tile()) {
        if (!this.hasCapacity() || !this.canStow(unit)) {
            return false;
        }
        this._transportRegistry.register(new TransportManifest_1.default(this, unit, sourceTile));
        this._transportRuleRegistry.process(Stowed_1.default, unit, this);
        return true;
    }
    unload(unit) {
        try {
            const manifest = this._transportRegistry.getByUnit(unit);
            this._transportRegistry.unregister(manifest);
            this._transportRuleRegistry.process(Unloaded_1.default, unit, this);
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
exports.Transport = Transport;
exports.default = exports.Transport;
//# sourceMappingURL=Transport.js.map