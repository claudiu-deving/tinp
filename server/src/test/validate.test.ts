/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { strictEqual } from 'assert';
import { validate } from '../parser';
import { ParseLines } from '../linesProvider';
import { DiagnosticSeverity } from 'vscode-languageserver';

it('should validate phase udas correctly', function () {

    const text = `phase(0,"j_Phase")
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
    const lines = ParseLines(text);
    const result = validate(lines);

    strictEqual(result[0].severity, DiagnosticSeverity.Information);
    strictEqual(result[0].message, 'phase');
});

