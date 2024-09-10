# VSCode Author Info Extension

This Visual Studio Code extension automatically adds author information to the top of files within your workspace. It supports multiple file types and applies the appropriate comment style for each one.

## Features

- Adds author information (full name, email, organization, GitHub/GitLab profile, and date) to source code files.
- Supports block and single-line comments for various programming languages (JavaScript, TypeScript, Python, Java, C/C++, Go, and more).
- Recursively adds author information to files in subdirectories.
- Fully configurable through input prompts when the command is executed.

## Supported File Types

The extension supports the following file extensions:

- `.js` (JavaScript)
- `.ts` (TypeScript)
- `.py` (Python)
- `.java` (Java)
- `.cpp`, `.c` (C/C++)
- `.cs` (C#)
- `.go` (Go)
- And other file types with similar comment styles.

## How to Use

1. Open your workspace folder in VSCode.
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac) to open the **Command Palette**.
3. Search for and run the command: `Add Author Info`.
4. You will be prompted to enter:
    - Author Full Name (required)
    - Author Email (required)
    - Organization (optional)
    - GitHub/GitLab Profile (optional)
5. The extension will automatically add the author information to the top of each source file in the workspace.

### Example Output

For a JavaScript file:

```javascript
/*
 * Author: John Doe
 * Email: john.doe@example.com
 * Organization: MyCompany
 * GitHub: https://github.com/johndoe
 * Date: Mon Sep 9 2024
 */
