export interface ClockState {
    bigint: bigint;
}
export declare class Clock {
    static readonly INTERVAL = 1000;
    private startTime;
    private currentTick;
    private subscribers;
    constructor();
    start(): this;
    getState(): {
        bigint: bigint;
    };
    subscribe(cb: () => any): this;
    unsubscribe(cb: () => any): void;
    protected tick(): this;
}
//# sourceMappingURL=Clock.d.ts.map