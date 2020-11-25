var UI = /** @class */ (function () {
    function UI() {
        Object.defineProperty(this, "$root", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "previousBinaryString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    Object.defineProperty(UI.prototype, "appendTo", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function ($el) {
            if (!this.$root) {
                throw new Error("UI must be rendered before it is appended");
            }
            else if (this.$root.parentNode) {
                throw new Error("UI already appended to an element");
            }
            $el.appendChild(this.$root);
            return this;
        }
    });
    Object.defineProperty(UI.prototype, "render", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function (state) {
            if (state.binaryString.length > 64) {
                throw new Error("Can't render binaryString longer than 64 characters");
            }
            else if (state.binaryString === this.previousBinaryString) {
                return this;
            }
            this.previousBinaryString = state.binaryString;
            var binaryString = state.binaryString.padStart(64, "0");
            var rerender = Boolean(this.$root);
            var $grid = (this.$root = rerender
                ? this.$root
                : document.createElement("main"));
            $grid.className = "grid";
            for (var i = 0; i < binaryString.length; i++) {
                var char = binaryString[i];
                var $cell = $grid.children[i] ||
                    document.createElement("div");
                $cell.dataset.value = char;
                $cell.className = "cell";
                if (!rerender) {
                    $grid.appendChild($cell);
                }
            }
            return this;
        }
    });
    return UI;
}());
export { UI };
//# sourceMappingURL=UI.js.map