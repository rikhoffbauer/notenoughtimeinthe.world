import { _13_8_BILLION_YEARS_IN_SECONDS } from "./constants.js";

export interface ClockState {
    bigint: bigint;
}

export class Clock {
    public static readonly INTERVAL = 1000;

    private startTime: bigint = BigInt(Math.floor(Date.now() / 1000));
    private currentTick: bigint = BigInt(0);
    private subscribers = new Set<() => any>();

    constructor() {
        this.tick = this.tick.bind(this);
        this.start = this.start.bind(this);
        this.getState = this.getState.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
    }

    public start() {
        setInterval(this.tick, Clock.INTERVAL);
        return this;
    }

    public getState() {
        return {
            bigint:
                BigInt(_13_8_BILLION_YEARS_IN_SECONDS) +
                this.startTime +
                this.currentTick,
        };
    }

    public subscribe(cb: () => any) {
        this.subscribers.add(cb);
        return this;
    }

    public unsubscribe(cb: () => any) {
        this.subscribers.delete(cb);
    }

    protected tick() {
        this.currentTick += BigInt(1);

        for (const subscriber of this.subscribers) {
            subscriber();
        }

        return this;
    }
}
