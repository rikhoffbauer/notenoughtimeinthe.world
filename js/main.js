"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
(function (main) {
    var math = window.math;
    math.config({ number: "BigNumber", precision: 64 });
    var _13_8_BILLION_YEARS_IN_SECONDS = math.bignumber("4.351968e17");
    var Clock = (function () {
        function Clock() {
            Object.defineProperty(this, "startTime", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: math.floor(math.evaluate("now / 1000", { now: Date.now() }))
            });
            Object.defineProperty(this, "currentTick", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: math.bignumber(0)
            });
            Object.defineProperty(this, "subscribers", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: new Set()
            });
            this.tick = this.tick.bind(this);
            this.start = this.start.bind(this);
            this.getState = this.getState.bind(this);
            this.subscribe = this.subscribe.bind(this);
            this.unsubscribe = this.unsubscribe.bind(this);
        }
        Object.defineProperty(Clock.prototype, "start", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                setInterval(this.tick, Clock.INTERVAL);
                return this;
            }
        });
        Object.defineProperty(Clock.prototype, "getState", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                return {
                    bignumber: math.evaluate("x + start + tick", {
                        x: _13_8_BILLION_YEARS_IN_SECONDS,
                        start: this.startTime,
                        tick: this.currentTick,
                    }),
                };
            }
        });
        Object.defineProperty(Clock.prototype, "subscribe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (cb) {
                this.subscribers.add(cb);
                return this;
            }
        });
        Object.defineProperty(Clock.prototype, "unsubscribe", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (cb) {
                this.subscribers.delete(cb);
                return this;
            }
        });
        Object.defineProperty(Clock.prototype, "tick", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function () {
                var e_1, _a;
                this.currentTick = math.evaluate("x + y", {
                    x: this.currentTick,
                    y: 1,
                });
                try {
                    for (var _b = __values(this.subscribers), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var subscriber = _c.value;
                        subscriber();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return this;
            }
        });
        Object.defineProperty(Clock, "INTERVAL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1000
        });
        return Clock;
    }());
    var UI = (function () {
        function UI() {
            Object.defineProperty(this, "$root", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "previousBinaryString", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
        }
        Object.defineProperty(UI.prototype, "appendTo", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function ($el) {
                if (!this.$root) {
                    throw new Error("UI must be rendered before it is appended");
                }
                else if (this.$root.parentNode) {
                    throw new Error("UI already appended to an element");
                }
                $el.appendChild(this.$root);
                return this;
            }
        });
        Object.defineProperty(UI.prototype, "render", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (props) {
                if (props.binaryString.length > 64) {
                    throw new Error("Can't render binaryString longer than 64 characters");
                }
                else if (this.previousBinaryString === props.binaryString) {
                    return this;
                }
                this.previousBinaryString = props.binaryString;
                var binaryString = props.binaryString
                    .replace(/[a-z]/g, "")
                    .padStart(64, "0");
                var rerender = Boolean(this.$root);
                var $grid = (this.$root = rerender
                    ? this.$root
                    : document.createElement("main"));
                $grid.className = "grid";
                for (var i = 0; i < binaryString.length; i++) {
                    var char = binaryString[i];
                    var $cell = $grid.children[i] ||
                        document.createElement("div");
                    $cell.dataset.value = char;
                    $cell.className = "cell";
                    if (!rerender) {
                        $grid.appendChild($cell);
                    }
                }
                return this;
            }
        });
        return UI;
    }());
    main({ Clock: Clock, UI: UI });
})(function main(_a) {
    var Clock = _a.Clock, UI = _a.UI;
    var clock = new Clock();
    var ui = new UI();
    var prev_widthLargerThanHeight;
    window.onresize = updateBodyClassName;
    updateBodyClassName();
    render().appendTo(document.body);
    clock.subscribe(render).start();
    function updateBodyClassName() {
        var widthLargerThanHeight = window.innerWidth > window.innerHeight;
        if (prev_widthLargerThanHeight === widthLargerThanHeight) {
            return;
        }
        document.body.className = widthLargerThanHeight
            ? "landscape"
            : "portrait";
    }
    function render() {
        return ui.render(getState());
    }
    function getState() {
        return mapClockStateToUIState(clock.getState());
    }
    function mapClockStateToUIState(clockState) {
        return {
            binaryString: clockState.bignumber.toBinary(),
        };
    }
});
