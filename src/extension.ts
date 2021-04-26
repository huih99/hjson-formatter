// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as hjson from 'hjson';

let customOptions: HjsonOptions = {};

const defaultOptions: HjsonOptions = {
  separator: true,
  condense: 4,
  bracesSameLine: true,
  quotes: 'keys',
  space: 2
};

function getOptions(): void {
  let config = vscode.workspace.getConfiguration('hjson-formatter');
  customOptions = config.get<HjsonOptions>('options', {});
}

vscode.workspace.onDidChangeConfiguration(getOptions);

getOptions();

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "hjson-formatter" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const format = (
    document: vscode.TextDocument,
    options: vscode.FormattingOptions
  ) => {
    const formatOptions = {
      ...defaultOptions,
      ...customOptions
    };
    // set default eol by current document
    const documentEol = document.eol === vscode.EndOfLine.LF ? '\n' : '\r\n';
    formatOptions.eol =
      !formatOptions.eol || formatOptions.eol === 'auto'
        ? documentEol
        : formatOptions.eol;

    // set indents size
    formatOptions.space =
      !formatOptions.space || formatOptions.space === 'auto'
        ? options.tabSize
        : formatOptions.space;

    const result: vscode.TextEdit[] = [];

    const start = new vscode.Position(0, 0);
    const end = new vscode.Position(
      document.lineCount - 1,
      document.lineAt(document.lineCount - 1).text.length
    );
    const range = new vscode.Range(start, end);
    const s = document.getText(range);
    try {
      hjson.setEndOfLine(formatOptions.eol);
      const parsed = hjson.rt.parse(s);
      const formattedText = hjson.rt.stringify(parsed, formatOptions);
      result.push(new vscode.TextEdit(range, formattedText));
      return result;
    } catch (e) {
      vscode.window.showErrorMessage(
        'Formatted document failed, please check your syntax'
      );
      console.error(e);
    }
  };
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider('hjson', {
      provideDocumentFormattingEdits(document, options, token) {
        return format(document, options);
      }
    })
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
