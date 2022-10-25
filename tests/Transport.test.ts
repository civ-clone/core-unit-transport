import { ITransport, Transport } from '../Transport';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  TransportRegistry,
  instance as transportRegistryInstance,
} from '../TransportRegistry';
import City from '@civ-clone/core-city/City';
import Naval from '@civ-clone/base-unit-type-naval/Naval';
import Player from '@civ-clone/core-player/Player';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
import { expect } from 'chai';

class NavalTransport extends Transport(Naval) {
  constructor(
    city: City | null,
    player: Player,
    tile: Tile,
    ruleRegistry: RuleRegistry = ruleRegistryInstance,
    transportRegistry: TransportRegistry = transportRegistryInstance
  ) {
    super(city, player, tile, ruleRegistry);

    this.setRuleRegistry(ruleRegistry);
    this.setTransportRegistry(transportRegistry);
  }
}

class PassengerFerry extends NavalTransport {
  capacity(): number {
    return 1;
  }
}

describe('Transport', () => {
  it('should be identified as the underlying type', () => {
    const ruleRegistry = new RuleRegistry(),
      transportRegistry = new TransportRegistry(),
      unitArgs: [null, Player, Tile, RuleRegistry, TransportRegistry] = [
        null,
        null as unknown as Player,
        null as unknown as Tile,
        ruleRegistry,
        transportRegistry,
      ],
      navalTransport = new NavalTransport(...unitArgs);

    expect(navalTransport instanceof Unit).true;
    expect(navalTransport instanceof Naval).true;
    expect(navalTransport.canStow(navalTransport as Unit)).false;
    expect(navalTransport.stow(navalTransport as Unit)).false;
    expect(navalTransport.capacity()).equal(0);

    const typeTest: ITransport = navalTransport,
      ferry = new PassengerFerry(...unitArgs);

    expect(ferry instanceof Naval).true;
    expect(ferry.hasCapacity()).true;
    expect(ferry.canStow(navalTransport as Unit)).true;
    expect(ferry.stow(navalTransport as Unit)).true;
    expect(ferry.hasCargo()).true;
    expect(ferry.cargo()).eql([typeTest]);
    expect(ferry.stow(navalTransport as Unit)).false;
    expect(ferry.unload(navalTransport as Unit)).true;
    expect(ferry.unload(navalTransport as Unit)).false;
  });
});
