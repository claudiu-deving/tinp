/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');
const { validateTabDefinition } = require('../server/tabDefinitionValidation');
const { getLocalizedString } = require('../resources/localizer');
const { peek } = require('../server/parser');
const { ParseLines } = require('../server/linesProvider');

it('should validate tab correctly', function () {
    let result = validateTabDefinition('tab_page("Display Name","Displayname",0)', 0);
    assert.strictEqual(result.isSuccessful, true);
});

it('should invalidate parameter mismatch for tab definition', function () {
    ParseLines(`tab_page("Tab","Display name")
        {`);
    let result = validateTabDefinition('tab_page("Tab","Display name")', 0);
    assert.strictEqual(result.isSuccessful, false);
});



it('should invalidate parameter mismatch for tab assignment', function () {
    let value = `tab_page("Tab","Display name")`;
    ParseLines(`${value}
        tab_page("Tab","Display name")`);
    let result = validateTabDefinition(value, 0);
    assert.strictEqual(result.isSuccessful, false);
});

it('should invalidate non tab/modify', function () {
    let value = `wrong_input`;
    let result = validateTabDefinition(value, 0);
    assert.strictEqual(result.isSuccessful, false);
    assert.strictEqual(result.diagnostic.message, getLocalizedString('tdv_e_4'), result.diagnostic.message);
});

it('should invalidate modify with missing parameter', function () {
    let value = `modify`;
    let result = validateTabDefinition(value, 0);
    assert.strictEqual(result.isSuccessful, false);
    assert.strictEqual(result.diagnostic.message, getLocalizedString('tdv_e_4'), result.diagnostic.message);
});