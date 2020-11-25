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

type BigNumber = math.BigNumber;

interface IUI {
    render(props: IUIProps): this;

    appendTo(el: HTMLElement): this;
}

interface IUIProps {
    binaryString: string;
}

((main: (deps: IMainDependencies) => any) => {
    const { math } = window;
    math.config({ number: "BigNumber", precision: 64 });
    const _13_8_BILLION_YEARS_IN_SECONDS = math.bignumber("4.351968e17");

    class Clock implements IClock {
        public static readonly INTERVAL = 1000;

        private startTime: BigNumber = math.floor(
            math.evaluate(`now / 1000`, { now: Date.now() }) as BigNumber,
        );
        private currentTick: BigNumber = math.bignumber(0);
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
                bignumber: math.evaluate(`x + start + tick`, {
                    x: _13_8_BILLION_YEARS_IN_SECONDS,
                    start: this.startTime,
                    tick: this.currentTick,
                }),
            };
        }

        public subscribe(cb: () => any) {
            this.subscribers.add(cb);
            return this;
        }

        public unsubscribe(cb: () => any) {
            this.subscribers.delete(cb);
            return this;
        }

        protected tick() {
            this.currentTick = math.evaluate(`x + y`, {
                x: this.currentTick,
                y: 1,
            });

            for (const subscriber of this.subscribers) {
                subscriber();
            }

            return this;
        }
    }

    class UI implements IUI {
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

        public render(props: IUIProps) {
            if (props.binaryString.length > 64) {
                throw new Error(
                    `Can't render binaryString longer than 64 characters`,
                );
            } else if (this.previousBinaryString === props.binaryString) {
                return this;
            }

            this.previousBinaryString = props.binaryString;

            const binaryString = props.binaryString
                .replace(/[a-z]/g, "")
                .padStart(64, "0");
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

    main({ Clock, UI });
})(function main({ Clock, UI }) {
    const clock = new Clock();
    const ui = new UI();
    let prev_widthLargerThanHeight: boolean;

    window.onresize = updateBodyClassName;

    updateBodyClassName();
    render().appendTo(document.body);
    clock.subscribe(render).start();

    function updateBodyClassName() {
        const widthLargerThanHeight = window.innerWidth > window.innerHeight;

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

    function mapClockStateToUIState(clockState: IClockState): IUIProps {
        return {
            binaryString: clockState.bignumber.toBinary(),
        };
    }
});
