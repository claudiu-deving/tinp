import { Diagnostic } from 'vscode-languageserver';
import { getLocalizedString } from './localizer';
import { ComposeDiagnosticError } from './validationHelpers';

export function validateAttribute(line: any, i: any): Diagnostic | null {
    if (!line.startsWith('attribute')) {
        if (!line.startsWith('unique_attribute')) {
            if (!line.startsWith('picture')) {
                return ComposeDiagnosticError(getLocalizedString('adv_e_1'), i, line);
            } else {
                const picturePattern = /picture\("[\w+ ]+",[\d ]+,[\d ]+,[\d ]+,[\d ]+\)/;
                if (!picturePattern.test(line)) {
                    return ComposeDiagnosticError(getLocalizedString('adv_e_2'), i, line);
                } else {
                    return null;
                }
            }
        } else {
            const uniqueAttributePattern = /unique_attribute\( ?"[\w+ ]+" ?, ?"([\w+ ]+)?" ?, ?[\w+ ]+ ?, ?"%[sd]" ?, ?(yes|no), ?none, ?"[\w+ .]+" ?, ?"[\w+ .]+" ?, ?[\d ]+ ?, ?[\d ]+ ?, ?[\d ]+ ?\)/;
            const smallerUniqueAttributePattern = /unique_attribute\( ?"[\w+ ]+" ?, ?"([\w+ ]+)?" ?, ?[\w+ ]+ ?, ?"%[sd]" ?, ?(yes|no) ?, ?none ?, ?"[\w+ .]+" ?, ?"[\w+ .]+" ?\)/;
            if (!uniqueAttributePattern.test(line) && !smallerUniqueAttributePattern.test(line)) {
                return ComposeDiagnosticError(getLocalizedString('adv_e_3'), i, line);
            } else {
                return null;
            }
        }
    } else {
        const attributePattern = /attribute\( ?"[\w+ ]+", ?"([\w+ ]+)?", ?[\w+ ]+, ?"%[sd]", ?(yes|no), ?none, ?"[\w+ .]+", ?"[\w+ .]+", ?[\d ]+, ?[\d ]+, ?[\d ]+\)/;
        const smallerAttributePatter = /attribute\( ?"[\w+ ]+", ?"([\w+ ]+)?" ?, ?[\w+ ]+ ?, ?"%[sd]" ?, ?(yes|no) ?, ?none ?, ?"[\w+ .]+" ?, ?"[\w+ .]+" ?\)/;
        const labelAttributePattern = /attribute\( ?"[\w+ ]+" ?, ?"([\w+ ]+)?" ?, ?[\w+ ]+ ?, ?"%[sd]" ?, ?(yes|no) ?, ?none ?, ?"[\w+ .]+" ?, ?"[\w+ .]+" ?, ?[\d ]+ ?, ?[\d ]+ ?\)/;

        if (!attributePattern.test(line) && !smallerAttributePatter.test(line) && !labelAttributePattern.test(line)) {
            return ComposeDiagnosticError(getLocalizedString('adv_e_3'), i, line);
        }
        else {
            return null;
        }

    }
}

exports.validateAttribute = validateAttribute;