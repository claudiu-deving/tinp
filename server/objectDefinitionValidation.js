const { ComposeDiagnosticError } = require('./validationHelpers')
const { objectDefinitions } = require('./constants');
const { getLocalizedString } = require('../resources/localizer')
function validateObjectDefinition(line, i, currentObject) {

    let pattern = /(\w+)\(/g;
    if (!pattern.test(line)) {
        return ComposeDiagnosticError(getLocalizedString('odv_e_1'), i, line);//odv_e_ = ObjectDefinitionValidation_Error_1
    }
    else {
        pattern.lastIndex = 0;
        const array = [...line.matchAll(pattern)];

        let value = array[0][1];
        if (!objectDefinitions.includes(value)) {
            return ComposeDiagnosticError(getLocalizedString('odv_e_2'), i, line)
        }
        else {
            pattern = /(.*)\((\d),.*"(.*)"\)/g;
            let isPatternFollowed = pattern.test(line);
            if (!isPatternFollowed) {
                return ComposeDiagnosticError(getLocalizedString('odv_e_3'), i, line);
            } else {
                //The internal state of the regex must be reset
                pattern.lastIndex = 0;
                currentObject = [...line.matchAll(pattern)][0][1];
                return {
                    isSuccessful: true,
                    currentObject: currentObject
                }
            }
        }
    }



}

exports.validateObjectDefinition = validateObjectDefinition;