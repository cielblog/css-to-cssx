export default class Compiler {
  cssString: string;

  constructor(cssString: string) {
    this.cssString = cssString;
  }

  private convertPropertyName(prop: string) {
    let lowerCase = prop.toLocaleLowerCase();

    if (lowerCase === "float") {
      return "cssFloat";
    }

    if (lowerCase.startsWith("--")) {
      return lowerCase;
    }

    if (lowerCase.startsWith("-ms-")) {
      lowerCase = lowerCase.substring(1);
    }

    return lowerCase.replace(/-(\w|$)/g, (match, rv) => rv.toUpperCase());
  }

  splitDeclarations(): string[] {
    const css = this.cssString;
    const declarations = [];

    let capturing: string | null = null;
    let index = this.cssString.length;
    let last = index;

    // Split into declarations by semi-colon (outside quotes or parentheses)
    while (index-- > -1) {
      // Capture unescaped quotes
      if (
        (css[index] === '"' || css[index] === "'") &&
        css[index - 1] !== "\\"
      ) {
        if (!capturing) {
          capturing = css[index];
        } else if (css[index] === capturing) {
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
  }

  splitDeclaration(declaration: string): string[] {
    const index = declaration.indexOf(":");
    return [
      declaration.substring(0, index).trim(),
      declaration.substring(index + 1).trim(),
    ];
  }

  proccess(): any {
    return this.splitDeclarations()
      .map(this.splitDeclaration)
      .reduce((styles: { [key: string]: any }, [name, value]) => {
        if (name && value) {
          styles[this.convertPropertyName(name)] = value;
        }
        return styles;
      }, {});
  }
}
