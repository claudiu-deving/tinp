import { validateObjectDefinition } from './objectDefinitionValidation';
import { validateTabDefinition } from "./tabDefinitionValidation";
import { validateAttribute } from './attributeDefinitionValidation';
import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver';

export function validate(lines: any) {
    const diagnostics: Diagnostic[] = [];
    let inBlockComment = false;
    let levelIndex = 0;
    let currentObject = "";
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Check for block comment start and end
        if (line.includes("/*")) inBlockComment = true;
        if (line.includes("*/")) {
            inBlockComment = false;
            continue; // Skip the line with block comment end
        }

        // Skip block comment lines
        if (inBlockComment) continue;
        // Skip lines starting with //
        if (/\/\/*/.test(line)) continue;
        line = line.trim();
        if (!line) {
            continue;
        }

        if (line.startsWith("{")) {
            levelIndex++;
            continue;
        }
        if (line.startsWith("}")) {
            levelIndex--;
            continue;
        }
        const shouldBeObjectDefinition = levelIndex === 0;
        if (shouldBeObjectDefinition) {
            const validation = validateObjectDefinition(line, i);

            if (validation.severity == DiagnosticSeverity.Error) {
                diagnostics.push(validation);
            } else {
                currentObject = validation.message;
                diagnostics.push(validation);
            }
        }
        // Phase doesn't contain a tab definition since its UDAs will added to the Phase Manager window
        const shouldBeTab = levelIndex === 1 && currentObject !== "phase";
        if (shouldBeTab) {
            const validation = validateTabDefinition(line, i);
            if (validation) {
                diagnostics.push(validation);
            }
        }

        const shouldBeAttribute = levelIndex === 2 && currentObject !== "phase";
        if (shouldBeAttribute) {
            const validation = validateAttribute(line, i);
            if (validation) {
                diagnostics.push(validation);
            }
        }

    }
    return diagnostics;
}
exports.validate = validate;