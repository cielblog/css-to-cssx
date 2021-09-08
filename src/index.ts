import Compiler from "./Compiler";
export function cssToCsx(cssString: string) {
  const compiler = new Compiler(cssString);

  return compiler.proccess();
}
