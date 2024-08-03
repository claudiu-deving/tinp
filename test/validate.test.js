/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');
const { validateTabDefinition } = require('../server/tabDefinitionValidation');
const { getLocalizedString } = require('../resources/localizer');
const { validate } = require('../server/parser');
const { ParseLines } = require('../server/linesProvider');

it('should validate phase udas correctly', function () {

    let text = `phase(0,"j_Phase")
{
    attribute("comment", "j_comment", string, "%s", no, none, "0.0", "0.0") 
    {
        value("", 0)
    }
/* --- Phase example attributes --------------------------------------------
    attribute("example_string", "Example string", string, "%s", no, none, "0.0", "0.0")
    {
        value("", 0)
    }
    attribute("example_integer", "Example integer", integer, "%s", no, none, "0.0", "0.0") 
    {
        value("", 0)
    }
    attribute("example_float", "Example float", float, "%s", no, none, "0.0", "0.0") 
    {
        value("", 0)
    }
----- Phase example attributes --------------------------------------------*/
}`;
    let lines = ParseLines(text);
    let result = validate(lines);

    assert.strictEqual(result.diagnostics == undefined, true);
});

