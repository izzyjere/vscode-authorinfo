/*

* Author: Wisdom Jere
* Email: wisdomjere5@gmail.com
* Organization: Codelabs Zambia

* GitHub: https://github.com/izzyjere

_________________________________________________________________
* Date: Tue Sep 10 2024
            
*/

import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('should add author info to files', async () => {
        // Activate the extension
        const extension = vscode.extensions.getExtension('codelabs-authorinfo');
        await extension?.activate();

        // Create a mock workspace folder and file
        const workspaceFolder = path.join(__dirname, 'testWorkspace');
        const mockFile = path.join(workspaceFolder, 'test.js');

        if (!fs.existsSync(workspaceFolder)) {
            fs.mkdirSync(workspaceFolder);
        }

        // Create a mock JavaScript file for testing
        fs.writeFileSync(mockFile, '// Mock JS file content');

        // Execute the addAuthorInfo command
        await vscode.commands.executeCommand('authorinfo.addAuthorInfo');

        // Read the file to check if author info is added
        const updatedContent = fs.readFileSync(mockFile, 'utf8');

        // Assert that author information has been added correctly
        assert.ok(updatedContent.includes('* Author:'));
        assert.ok(updatedContent.includes('* Email:'));
        assert.ok(updatedContent.includes('* Date:'));

        // Clean up
        fs.unlinkSync(mockFile);
        fs.rmdirSync(workspaceFolder);
    });
});
