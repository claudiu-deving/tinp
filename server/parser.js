const { validateObjectDefinition } = require('./objectDefinitionValidation');
const { validateTabDefinition } = require("./tabDefinitionValidation");
const { validateAttribute } = require('./attributeDefinitionValidation');

function validate(lines) {
    const diagnostics = [];
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
        let shouldBeObjectDefinition = levelIndex === 0;
        if (shouldBeObjectDefinition) {
            let validation = validateObjectDefinition(line, i, currentObject);

            if (!validation.isSuccessful) {
                diagnostics.push(validation.diagnostic);
            } else {
                currentObject = validation.currentObject;
            }
        }
        // Phase doesn't contain a tab definition since its UDAs will added to the Phase Manager window
        let shouldBeTab = levelIndex === 1 && currentObject !== "phase";
        if (shouldBeTab) {
            let validation = validateTabDefinition(line, i);
            if (!validation.isSuccessful) {
                diagnostics.push(validation.diagnostic);
            }
        }

        let shouldBeAttribute = levelIndex === 2 && currentObject !== "phase";
        if (shouldBeAttribute) {
            let validation = validateAttribute(line, i);
            if (!validation.isSuccessful) {
                diagnostics.push(validation.diagnostic);
            }
        }

    }
    return diagnostics;
}
exports.validate = validate;