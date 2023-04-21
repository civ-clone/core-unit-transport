"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = exports.isTransport = void 0;
const Yields_1 = require("./Yields");
const RuleRegistry_1 = require("@civ-clone/core-rule/RuleRegistry");
const TransportRegistry_1 = require("./TransportRegistry");
const Unit_1 = require("@civ-clone/core-unit/Unit");
const Stowed_1 = require("./Rules/Stowed");
const TransportManifest_1 = require("./TransportManifest");
const Unloaded_1 = require("./Rules/Unloaded");
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
const Transport = (Base) => { var _Transport_ruleRegistry, _Transport_transportRegistry, _a; return _a = class Transport extends Base {
        constructor() {
            super(...arguments);
            _Transport_ruleRegistry.set(this, RuleRegistry_1.instance);
            _Transport_transportRegistry.set(this, TransportRegistry_1.instance);
        }
        canStow(unit) {
            return !this.cargo().includes(unit) && this.hasCapacity();
        }
        capacity() {
            const [unitYield] = this.yield(new Yields_1.Capacity());
            return unitYield;
        }
        cargo() {
            return __classPrivateFieldGet(this, _Transport_transportRegistry, "f")
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
            return (__classPrivateFieldGet(this, _Transport_transportRegistry, "f").getByTransport(this).length > 0);
        }
        // Ideally, these would be `protected`: https://github.com/microsoft/TypeScript/issues/30355
        setRuleRegistry(ruleRegistry) {
            __classPrivateFieldSet(this, _Transport_ruleRegistry, ruleRegistry, "f");
        }
        setTransportRegistry(transportRegistry) {
            __classPrivateFieldSet(this, _Transport_transportRegistry, transportRegistry, "f");
        }
        stow(unit, sourceTile = unit.tile()) {
            if (!this.hasCapacity() || !this.canStow(unit)) {
                return false;
            }
            __classPrivateFieldGet(this, _Transport_transportRegistry, "f").register(new TransportManifest_1.default(this, unit, sourceTile));
            __classPrivateFieldGet(this, _Transport_ruleRegistry, "f").process(Stowed_1.default, unit, this);
            return true;
        }
        unload(unit) {
            try {
                const manifest = __classPrivateFieldGet(this, _Transport_transportRegistry, "f").getByUnit(unit);
                __classPrivateFieldGet(this, _Transport_transportRegistry, "f").unregister(manifest);
                __classPrivateFieldGet(this, _Transport_ruleRegistry, "f").process(Unloaded_1.default, unit, this);
                return true;
            }
            catch (e) {
                return false;
            }
        }
    },
    _Transport_ruleRegistry = new WeakMap(),
    _Transport_transportRegistry = new WeakMap(),
    _a; };
exports.Transport = Transport;
exports.default = exports.Transport;
//# sourceMappingURL=Transport.js.map