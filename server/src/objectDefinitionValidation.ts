import { ComposeDiagnosticError } from './validationHelpers';
import { objectDefinitions } from './constants';
import { getLocalizedString } from './localizer';
import { Diagnostic, DiagnosticSeverity, Position, Range } from 'vscode-languageserver';
export function validateObjectDefinition(line: any, i: any): Diagnostic {

    let pattern = /(\w+)\(/g;
    if (!pattern.test(line)) {
        return ComposeDiagnosticError(getLocalizedString('odv_e_1'), i, line);//odv_e_ = ObjectDefinitionValidation_Error_1
    }
    else {
        pattern.lastIndex = 0;
        const array = [...line.matchAll(pattern)];

        const value = array[0][1];
        if (!objectDefinitions.includes(value)) {
            return ComposeDiagnosticError(getLocalizedString('odv_e_2'), i, line);
        }
        else {
            pattern = /(.*)\((\d),.*"(.*)"\)/g;
            const isPatternFollowed = pattern.test(line);
            if (!isPatternFollowed) {
                return ComposeDiagnosticError(getLocalizedString('odv_e_3'), i, line);
            }
            return Diagnostic.create(Range.create(
                Position.create(i, 0),
                Position.create(i, line.length)
            ), value, DiagnosticSeverity.Information, '', 'TINP Linter');
        }
    }
}

exports.validateObjectDefinition = validateObjectDefinition;