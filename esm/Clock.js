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
import { _13_8_BILLION_YEARS_IN_SECONDS } from "./constants.js";
var Clock = /** @class */ (function () {
    function Clock() {
        Object.defineProperty(this, "startTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: BigInt(Math.floor(Date.now() / 1000))
        });
        Object.defineProperty(this, "currentTick", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: BigInt(0)
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
                bigint: BigInt(_13_8_BILLION_YEARS_IN_SECONDS) +
                    this.startTime +
                    this.currentTick,
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
        }
    });
    Object.defineProperty(Clock.prototype, "tick", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function () {
            var e_1, _a;
            this.currentTick += BigInt(1);
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
export { Clock };
//# sourceMappingURL=Clock.js.map