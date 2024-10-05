import { notStrictEqual, strictEqual } from 'assert';
import { validateObjectDefinition } from '../objectDefinitionValidation';
import { getLocalizedString } from '../localizer';
import { DiagnosticSeverity } from 'vscode-languageserver';


it('should validate correctly', function () {
    const result = validateObjectDefinition('part(0,"Part")', 0);
    strictEqual(result.severity, DiagnosticSeverity.Information);
    strictEqual(result.message, 'part');
});

it('should return expected diagnostic error when the general pattern is not followed', function () {
    const result = validateObjectDefinition('part 0,"Part"', 0);
    notStrictEqual(result, null);
    strictEqual(result?.message, getLocalizedString('odv_e_1'));
});


it('should return expected diagnostic error when it doesn`t start with an expected object definition', function () {
    const result = validateObjectDefinition('part_nonexistent(0,"Part")', 0);
    notStrictEqual(result, null);
    strictEqual(result?.message, getLocalizedString('odv_e_2'));
});

it('should return expected diagnostic error when it doesn`t contain the index argument', function () {
    const result = validateObjectDefinition('part("Part")', 0);
    notStrictEqual(result, null);
    strictEqual(result?.message, getLocalizedString('odv_e_3'));
});

it('should return expected diagnostic error when it doesn`t contain the name argument', function () {
    const result = validateObjectDefinition('part(1)', 0);
    notStrictEqual(result, null);
    strictEqual(result?.message, getLocalizedString('odv_e_3'));
});
it('should return expected diagnostic error when it doesn`t contain neither arguments', function () {
    const result = validateObjectDefinition('part()', 0);
    notStrictEqual(result, null);
    strictEqual(result.message, getLocalizedString('odv_e_3'));
});

it('should change currentObject to part when part is passed', function () {
    const result = validateObjectDefinition('part(0,"Part")', 0);
    strictEqual(result.message, 'part');
});
it('should change currentObject to beam when beam is passed', function () {
    const result = validateObjectDefinition('beam(0,"Part")', 0);
    strictEqual(result.message, 'beam');
});