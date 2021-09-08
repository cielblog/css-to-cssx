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
//# sourceMappingURL=index.js.map