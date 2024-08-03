/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');
const { validateAttribute } = require('../server/attributeDefinitionValidation');
const { getLocalizedString } = require('../resources/localizer');
const { peek } = require('../server/parser');
const { ParseLines } = require('../server/linesProvider');

it('should validate attribute correctly', function () {
    let result = validateAttribute('attribute("CONN_CAP_END2", "", string, "%s", no, none, "0.0", "0.0",460,340,120)', 0);
    assert.strictEqual(result.isSuccessful, true);
});
it('should validate unique attribute correctly', function () {
    let result = validateAttribute('unique_attribute("CONN_CAP_END2", "", string, "%s", no, none, "0.0", "0.0",460,340,120)', 0);
    assert.strictEqual(result.isSuccessful, true);
});
it('should validate picture correctly', function () {
    let result = validateAttribute('picture("jbp_bs_hor_line_1", 160, 2, 16, 290)', 0);
    assert.strictEqual(result.isSuccessful, true);
});

it('should invalidate wrong input', function () {
    let result = validateAttribute('attribute("CONN_CAP_END2", "", string, "%s", no, none, "0.0", "0.0",460,340)', 0);
    assert.strictEqual(result.isSuccessful, false);
});