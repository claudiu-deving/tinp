/* eslint-disable no-undef */
const assert = require('assert');
const { validateObjectDefinition } = require('../server/objectDefinitionValidation');
const { getLocalizedString } = require('../resources/localizer');


it('should validate correctly', function () {
    let currentObject;
    let result = validateObjectDefinition('part(0,"Part")', 0, currentObject);
    assert.strictEqual(result.isSuccessful, true);
});

it('should return expected diagnostic error when the general pattern is not followed', function () {
    let currentObject;
    let result = validateObjectDefinition('part 0,"Part"', 0, currentObject);
    assert.strictEqual(result.isSuccessful, false);
    assert.strictEqual(result.diagnostic.message, getLocalizedString('odv_e_1'));
});


it('should return expected diagnostic error when it doesn`t start with an expected object definition', function () {
    let currentObject;
    let result = validateObjectDefinition('part_nonexistent(0,"Part")', 0, currentObject);
    assert.strictEqual(result.isSuccessful, false);
    assert.strictEqual(result.diagnostic.message, getLocalizedString('odv_e_2'));
});

it('should return expected diagnostic error when it doesn`t contain the index argument', function () {
    let currentObject;
    let result = validateObjectDefinition('part("Part")', 0, currentObject);
    assert.strictEqual(result.isSuccessful, false);
    assert.strictEqual(result.diagnostic.message, getLocalizedString('odv_e_3'));
});

it('should return expected diagnostic error when it doesn`t contain the name argument', function () {
    let currentObject;
    let result = validateObjectDefinition('part(1)', 0, currentObject);
    assert.strictEqual(result.isSuccessful, false);
    assert.strictEqual(result.diagnostic.message, getLocalizedString('odv_e_3'));
});
it('should return expected diagnostic error when it doesn`t contain neither arguments', function () {
    let currentObject;
    let result = validateObjectDefinition('part()', 0, currentObject);
    assert.strictEqual(result.isSuccessful, false);
    assert.strictEqual(result.diagnostic.message, getLocalizedString('odv_e_3'));
});

it('should change currentObject to part when part is passed', function () {
    let currentObject;
    let result = validateObjectDefinition('part(0,"Part")', 0, currentObject);
    assert.strictEqual(result.currentObject, 'part')
});
it('should change currentObject to beam when beam is passed', function () {
    let currentObject;
    let result = validateObjectDefinition('beam(0,"Part")', 0, currentObject);
    assert.strictEqual(result.currentObject, 'beam')
});