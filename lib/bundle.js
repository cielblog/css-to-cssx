(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cssToCsx = void 0;
var Compiler_1 = __importDefault(require("./Compiler"));
function cssToCsx(cssString) {
    var compiler = new Compiler_1.default(cssString);
    return compiler.proccess();
}
exports.cssToCsx = cssToCsx;

},{"./Compiler":1}]},{},[2]);
