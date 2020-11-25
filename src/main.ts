import { Clock, ClockState } from "./Clock.js";
import { UI, UIState } from "./UI.js";

export function main() {
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
}

function mapClockStateToUIState(clockState: ClockState): UIState {
    return {
        binaryString: clockState.bigint.toString(2),
    };
}
