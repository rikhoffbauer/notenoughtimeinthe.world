/// <reference types="mathjs" />
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
    bignumber: math.BigNumber;
}
declare type BigNumber = math.BigNumber;
interface IUI {
    render(props: IUIProps): this;
    appendTo(el: HTMLElement): this;
}
interface IUIProps {
    binaryString: string;
}
//# sourceMappingURL=main.d.ts.map