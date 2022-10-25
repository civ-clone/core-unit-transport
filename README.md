# core-unit-transport

Includes the core functionality to have `Unit`s that can carry other units (`Trireme`, `Sail`, etc. in Civilization).

`Transport` provides a mixin style applicator which accepts a `Unit` (or something that extends `Unit`) class and adds
the required methods from `ITransport`, e.g. `class SomeTransport extends Transport(SomeBase) { /* ... */ }`.

`TransportManifest`s are used to track what cargo a `Transport` is carrying. and the `TransportRegistry` is used to
retrieve these manifests.

Includes `Stowed` and `Unloaded` `Rule`s triggered when the corresponding action is performed on a `Transport`.

Hopefully, the way this has been written, it should be possible to have any type of unit be a `Transport` so you could
have `Air` `Unit`s, `Land` `Unit`s, or even `Diplomatic` `Unit`s...
