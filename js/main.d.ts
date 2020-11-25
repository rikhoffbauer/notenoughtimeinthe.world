interface IMainDependencies {
    Clock: new () => IClock;
    UI: new () => IUI;
}
interface IClock {
    getState(): IClockState;
    subscribe(listener: () => any): this;
    unsubscribe(listener: () => any): this;
    start(): this;
}
interface IClockState {
    bigint: bigint;
}
interface IUI {
    render(props: IUIProps): this;
    appendTo(el: HTMLElement): this;
}
interface IUIProps {
    binaryString: string;
}
//# sourceMappingURL=main.d.ts.map