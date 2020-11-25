export interface UIState {
    binaryString: string;
}

export class UI {
    private $root?: HTMLElement;
    private previousBinaryString?: string;

    public appendTo($el: HTMLElement) {
        if (!this.$root) {
            throw new Error(`UI must be rendered before it is appended`);
        } else if (this.$root.parentNode) {
            throw new Error(`UI already appended to an element`);
        }

        $el.appendChild(this.$root);

        return this;
    }

    public render(state: UIState) {
        if (state.binaryString.length > 64) {
            throw new Error(
                `Can't render binaryString longer than 64 characters`,
            );
        } else if (state.binaryString === this.previousBinaryString) {
            return this;
        }

        this.previousBinaryString = state.binaryString;

        const binaryString = state.binaryString.padStart(64, "0");
        const rerender = Boolean(this.$root);
        const $grid: HTMLElement = (this.$root = rerender
            ? (this.$root as HTMLElement)
            : document.createElement("main"));
        $grid.className = "grid";

        for (let i = 0; i < binaryString.length; i++) {
            const char = binaryString[i];
            const $cell =
                ($grid.children[i] as HTMLElement) ||
                document.createElement("div");
            $cell.dataset.value = char;
            $cell.className = "cell";

            if (!rerender) {
                $grid.appendChild($cell);
            }
        }

        return this;
    }
}
