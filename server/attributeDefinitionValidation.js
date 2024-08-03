const { getLocalizedString } = require('../resources/localizer');
const { ComposeDiagnosticError } = require('./validationHelpers');

function validateAttribute(line, i) {
    if (!line.startsWith('attribute')) {
        if (!line.startsWith('unique_attribute')) {
            if (!line.startsWith('picture')) {
                return ComposeDiagnosticError(getLocalizedString('adv_e_1'), i, line);
            } else {
                let picturePattern = /picture\("[\w+ ]+",[\d ]+,[\d ]+,[\d ]+,[\d ]+\)/;
                if (!picturePattern.test(line)) {
                    return ComposeDiagnosticError(getLocalizedString('adv_e_2'), i, line);
                } else {
                    return {
                        isSuccessful: true
                    }
                }
            }
        } else {
            let uniqueAttributePattern = /unique_attribute\( ?"[\w+ ]+" ?, ?"([\w+ ]+)?" ?, ?[\w+ ]+ ?, ?"%[sd]" ?, ?(yes|no), ?none, ?"[\w+ .]+" ?, ?"[\w+ .]+" ?, ?[\d ]+ ?, ?[\d ]+ ?, ?[\d ]+ ?\)/;
            let smallerUniqueAttributePattern = /unique_attribute\( ?"[\w+ ]+" ?, ?"([\w+ ]+)?" ?, ?[\w+ ]+ ?, ?"%[sd]" ?, ?(yes|no) ?, ?none ?, ?"[\w+ .]+" ?, ?"[\w+ .]+" ?\)/;
            if (!uniqueAttributePattern.test(line) && !smallerUniqueAttributePattern.test(line)) {
                return ComposeDiagnosticError(getLocalizedString('adv_e_3'), i, line);
            } else {
                return {
                    isSuccessful: true
                }
            }
        }
    } else {
        let attributePattern = /attribute\( ?"[\w+ ]+", ?"([\w+ ]+)?", ?[\w+ ]+, ?"%[sd]", ?(yes|no), ?none, ?"[\w+ .]+", ?"[\w+ .]+", ?[\d ]+, ?[\d ]+, ?[\d ]+\)/;
        let smallerAttributePatter = /attribute\( ?"[\w+ ]+", ?"([\w+ ]+)?" ?, ?[\w+ ]+ ?, ?"%[sd]" ?, ?(yes|no) ?, ?none ?, ?"[\w+ .]+" ?, ?"[\w+ .]+" ?\)/;
        let labelAttributePattern = /attribute\( ?"[\w+ ]+" ?, ?"([\w+ ]+)?" ?, ?[\w+ ]+ ?, ?"%[sd]" ?, ?(yes|no) ?, ?none ?, ?"[\w+ .]+" ?, ?"[\w+ .]+" ?, ?[\d ]+ ?, ?[\d ]+ ?\)/;

        if (!attributePattern.test(line) && !smallerAttributePatter.test(line) && !labelAttributePattern.test(line)) {
            return ComposeDiagnosticError(getLocalizedString('adv_e_3'), i, line);
        }
        else {
            return {
                isSuccessful: true
            }
        }

    }
}

exports.validateAttribute = validateAttribute;