import { tabDefinition } from './constants';
import { getLocalizedString } from './localizer';
import { ComposeDiagnosticError } from './validationHelpers';
import { peek } from './linesProvider';
import { Diagnostic } from 'vscode-languageserver';

export function validateTabDefinition(line: any, i: any): Diagnostic | null {
    if (!line.startsWith(tabDefinition)) {
        if (!line.startsWith("modify")) {
            return ComposeDiagnosticError(getLocalizedString('tdv_e_4'), i, line)
        } else {
            let pattern = /modify\([01]\)/;
            if (!pattern.test(line)) {
                return ComposeDiagnosticError(getLocalizedString('tdv_e_4'), i, line);
            }

            return null
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
        return null
    }

    function isTabDefinition() {
        return peek(i) === '{';
    }
}

exports.validateTabDefinition = validateTabDefinition