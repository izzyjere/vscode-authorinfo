/*

* Author: Wisdom Jere
* Email: wisdomjere5@gmail.com
* Organization: Codelabs Zambia

* GitHub: https://github.com/izzyjere

_________________________________________________________________
* Date: Tue Sep 10 2024
            
*/

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// Utility function to determine the correct comment style based on the file extension
function getCommentStyle(fileExtension: string): { start: string; end?: string } {
    switch (fileExtension) {
        case '.js':
        case '.ts':
        case '.java':
        case '.c':
        case '.cpp':
        case '.cs':
        case '.go':
            return { start: '/*', end: '*/' }; // Block comment style
        case '.py':
        case '.sh':
        case '.rb':
        case '.pl':
            return { start: '#' }; // Single-line comment style
        default:
            return { start: '/*', end: '*/' }; // Default to block comments for other languages
    }
}

function addAuthorInfoToFiles(directory: string, authorInfo: string) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            vscode.window.showErrorMessage(`Could not read directory: ${err.message}`);
            return;
        }

        files.forEach((file) => {
            const fullPath = path.join(directory, file);
            fs.stat(fullPath, (err, stats) => {
                if (err) {
                    return;
                }

                if (stats.isDirectory()) {
                    // Recursively add author info to files in subdirectories
                    addAuthorInfoToFiles(fullPath, authorInfo);
                } else {
                    const ext = path.extname(file);
                    if (/\.(js|ts|py|cpp|c|cs|go|java)$/.test(ext)) {
                        // Modify only certain file types
                        fs.readFile(fullPath, 'utf8', (err, data) => {
                            if (err) {
                                return;
                            }

                            // Determine the comment style based on the file extension
                            const { start, end } = getCommentStyle(ext);

                            if (!data.includes(authorInfo)) {
                                // Add the author info if it doesn't already exist
                                const commentBlock = `${start}\n${authorInfo}\n${end ? end : ''}\n`;
                                const newData = `${commentBlock}${data}`;
                                fs.writeFile(fullPath, newData, 'utf8', (err) => {
                                    if (err) {
                                        vscode.window.showErrorMessage(`Failed to write file: ${err.message}`);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });
    });
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('authorinfo.addAuthorInfo', async () => {
        try {
            // Prompt the user for input
            const authorFullName = await vscode.window.showInputBox({ prompt: 'Enter Author Full Name' });
            const authorEmail = await vscode.window.showInputBox({ prompt: 'Enter Author Email' });
            const authorOrganization = await vscode.window.showInputBox({
                prompt: 'Enter Organization (optional)',
                value: '',
            });
            const githubProfile = await vscode.window.showInputBox({
                prompt: 'Enter GitHub or GitLab Profile URL (optional)',
                value: '',
            });

            if (!authorFullName || !authorEmail) {
                vscode.window.showErrorMessage('Author name and email are required.');
                return;
            }

            const currentDate = new Date().toDateString();

            // Block comment template for author information
            const authorInfo = `
* Author: ${authorFullName}
* Email: ${authorEmail}
${authorOrganization ? `* Organization: ${authorOrganization}\n` : ''}
${githubProfile ? `* GitHub: ${githubProfile}\n` : ''}
_________________________________________________________________
* Date: ${currentDate}
            `;

            const workspaceFolders = vscode.workspace.workspaceFolders;
            if (workspaceFolders && workspaceFolders.length > 0) {
                const rootDir = workspaceFolders[0].uri.fsPath;
                addAuthorInfoToFiles(rootDir, authorInfo);
                vscode.window.showInformationMessage('Author information added to all files.');
            } else {
                vscode.window.showErrorMessage('No workspace folder found.');
            }
        } catch (error) {
            vscode.window.showErrorMessage('An error occurred: ' + error);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
