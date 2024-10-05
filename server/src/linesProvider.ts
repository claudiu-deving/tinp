let lines: any[];

export function ParseLines(text: any) {
    lines = text.split(/\r?\n/);
    return lines;
}

export function peek(i: any) {
    if (!lines) return;
    let value = lines.at(i + 1);
    if (value) {
        value = value.trim();
    }
    return value;
}

exports.ParseLines = ParseLines;
exports.peek = peek;