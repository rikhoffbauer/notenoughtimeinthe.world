import { Clock } from "./Clock.js";
import { UI } from "./UI.js";
export function main() {
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
}
function mapClockStateToUIState(clockState) {
    return {
        binaryString: clockState.bigint.toString(2),
    };
}
//# sourceMappingURL=main.js.map