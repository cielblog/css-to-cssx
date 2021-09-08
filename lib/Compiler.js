"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Compiler = /** @class */ (function () {
    function Compiler(cssString) {
        this.cssString = cssString;
    }
    Compiler.prototype.convertPropertyName = function (prop) {
        var lowerCase = prop.toLocaleLowerCase();
        if (lowerCase === "float") {
            return "cssFloat";
        }
        if (lowerCase.startsWith("--")) {
            return lowerCase;
        }
        if (lowerCase.startsWith("-ms-")) {
            lowerCase = lowerCase.substring(1);
        }
        return lowerCase.replace(/-(\w|$)/g, function (match, rv) { return rv.toUpperCase(); });
    };
    Compiler.prototype.splitDeclarations = function () {
        var css = this.cssString;
        var declarations = [];
        var capturing = null;
        var index = this.cssString.length;
        var last = index;
        // Split into declarations by semi-colon (outside quotes or parentheses)
        while (index-- > -1) {
            // Capture unescaped quotes
            if ((css[index] === '"' || css[index] === "'") &&
                css[index - 1] !== "\\") {
                if (!capturing) {
                    capturing = css[index];
                }
                else if (css[index] === capturing) {
                    capturing = null;
                }
            }
            // Start capturing parentheses
            if (!capturing && css[index] === ")") {
                capturing = css[index];
            }
            // Stop capturing parentheses
            if (css[index] === "(" && capturing === ")") {
                capturing = null;
            }
            // Split at semi-colon
            if (index < 0 || (!capturing && css[index] === ";")) {
                declarations.unshift(css.slice(index + 1, last));
            }
        }
        return declarations;
    };
    Compiler.prototype.splitDeclaration = function (declaration) {
        var index = declaration.indexOf(":");
        return [
            declaration.substring(0, index).trim(),
            declaration.substring(index + 1).trim(),
        ];
    };
    Compiler.prototype.proccess = function () {
        var _this = this;
        return this.splitDeclarations()
            .map(this.splitDeclaration)
            .reduce(function (styles, _a) {
            var name = _a[0], value = _a[1];
            if (name && value) {
                styles[_this.convertPropertyName(name)] = value;
            }
            return styles;
        }, {});
    };
    return Compiler;
}());
exports.default = Compiler;
//# sourceMappingURL=Compiler.js.map