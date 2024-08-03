const { tabDefinition } = require('./constants');
const { getLocalizedString } = require('../resources/localizer');
const { ComposeDiagnosticError } = require('./validationHelpers');
const { peek } = require('./linesProvider');

function validateTabDefinition(line, i) {
    if (!line.startsWith(tabDefinition)) {
        if (!line.startsWith("modify")) {
            return ComposeDiagnosticError(getLocalizedString('tdv_e_4'), i, line)
        } else {
            let pattern = /modify\([01]\)/;
            if (!pattern.test(line)) {
                return ComposeDiagnosticError(getLocalizedString('tdv_e_4'), i, line);
            }

            return { isSuccessful: true }
        }
    } else {
        if (isTabDefinition()) {
            // Multiple object types can have the parameters tab.
            // But a tab cannot be defined multiple times, it can only be redesigned so to speak
            // The second time will be defined (by having its attributes listed), the identifier cannot be present.
            let noIndexPattern = /tab_page\("\w+"\)/;
            let fullPattern = /tab_page\("","[\w+ ]+",\d+\)/;


            if (!noIndexPattern.test(line) && !fullPattern.test(line)) {
                return ComposeDiagnosticError(getLocalizedString('tdv_e_2'), i, line);
            }
        } else {
            let pattern = /tab_page\("[\w+ ]+","[\w+ ]+",\d+\)/;
            if (!pattern.test(line)) {
                return ComposeDiagnosticError(getLocalizedString('tdv_e_3'), i, line);
            }
        }
        return { isSuccessful: true }
    }

    function isTabDefinition() {
        return peek(i) === '{';
    }
}

exports.validateTabDefinition = validateTabDefinition