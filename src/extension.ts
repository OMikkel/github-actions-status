// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as dotenv from 'dotenv';
import * as vscode from 'vscode';
import getAllWorkflows from './getAllWorkflows';
import path = require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    dotenv.config({ path: path.join(__dirname + "../../.env") });

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 10);
    statusBarItem.text = "Github Actions Status";
    statusBarItem.show();
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "github-actions-status" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('github-actions-status.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Github-Actions-Status!');
	});
    
    const authenticateGithubCmd = vscode.commands.registerCommand("github-actions-status.authenticateGithub", async () => {
        try {
            vscode.authentication.getSession("github", ["repo"], {
                createIfNone: true
            }).then((session) => {
                getAllWorkflows(session);
            });
            
        } catch (err) {
            console.log(err);
        }
    });

    context.subscriptions.push(authenticateGithubCmd);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
