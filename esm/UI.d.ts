export interface UIState {
    binaryString: string;
}
export declare class UI {
    private $root?;
    private previousBinaryString?;
    appendTo($el: HTMLElement): this;
    render(state: UIState): this;
}
//# sourceMappingURL=UI.d.ts.map