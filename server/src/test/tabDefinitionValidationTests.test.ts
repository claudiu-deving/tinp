import { notStrictEqual, strict, strictEqual } from 'assert';
import { validateTabDefinition } from '../tabDefinitionValidation';
import { getLocalizedString } from '../localizer';
import { ParseLines } from '../linesProvider';

it('should validate tab correctly', function () {
    const result = validateTabDefinition('tab_page("Display Name","Displayname",0)', 0);
    strictEqual(result, null);
});

it('should invalidate parameter mismatch for tab definition', function () {
    ParseLines(`tab_page("Tab","Display name")
        {`);
    const result = validateTabDefinition('tab_page("Tab","Display name")', 0);
    notStrictEqual(result, null);
});



it('should invalidate parameter mismatch for tab assignment', function () {
    const value = `tab_page("Tab","Display name")`;
    ParseLines(`${value}
        tab_page("Tab","Display name")`);
    const result = validateTabDefinition(value, 0);
    notStrictEqual(result, null);
});

it('should invalidate non tab/modify', function () {
    const value = `wrong_input`;
    const result = validateTabDefinition(value, 0);
    notStrictEqual(result, null);
    if (result == null) return;
    strictEqual(result.message, getLocalizedString('tdv_e_4'));
});

it('should invalidate modify with missing parameter', function () {
    const value = `modify`;
    const result = validateTabDefinition(value, 0);
    notStrictEqual(result, null);
    if (result == null) return;
    strictEqual(result.message, getLocalizedString('tdv_e_4'));
});