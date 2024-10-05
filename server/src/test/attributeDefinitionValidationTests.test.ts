import { notStrictEqual, strictEqual } from 'assert';
import { validateAttribute } from '../attributeDefinitionValidation';

it('should validate attribute correctly', function () {
    const result = validateAttribute('attribute("CONN_CAP_END2", "", string, "%s", no, none, "0.0", "0.0",460,340,120)', 0);
    strictEqual(result, null);
});
it('should validate unique attribute correctly', function () {
    const result = validateAttribute('unique_attribute("CONN_CAP_END2", "", string, "%s", no, none, "0.0", "0.0",460,340,120)', 0);
    strictEqual(result, null);
});
it('should validate picture correctly', function () {
    const result = validateAttribute('picture("jbp_bs_hor_line_1", 160, 2, 16, 290)', 0);
    strictEqual(result, null);
});

it('should invalidate wrong input', function () {
    const result = validateAttribute('attrbute("CONN_CAP_END2", "", string, "%s", no, none, "0.0", "0.0",460,340)', 0);
    notStrictEqual(result, null);
});