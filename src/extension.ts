// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as hjson from 'hjson';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hjson-formatter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const format = (document: vscode.TextDocument) => {
		const result: vscode.TextEdit[] = [];

		const start = new vscode.Position(0, 0);
		const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
		const range = new vscode.Range(start, end);
		const s = document.getText(range);
		try {
			const parsed = hjson.rt.parse(s);
			const formattedText = hjson.rt.stringify(parsed, {
				separator: true, // 元素之间使用逗号分隔符
				condense: 4, // 最小换行长度，超出长度后将换行， 0：off
				bracesSameLine: true, // 括号是否保持跟key同行
				quotes: 'keys' // 控制字符串如何展示，是否要包裹引号。keys: key需要使用引号包裹
			});
			result.push(new vscode.TextEdit(range, formattedText));
			return result;
		} catch (e) {
			vscode.window.showErrorMessage("Formatted document failed, please check your syntax");
			console.error(e);
		}
	};
	context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('hjson', {
		provideDocumentFormattingEdits(document, options, token) {
			return format(document);
		}
	}));
}

// this method is called when your extension is deactivated
export function deactivate() { }
