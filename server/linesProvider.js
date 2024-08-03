let lines = [];

function ParseLines(text) {
    lines = text.split(/\r?\n/);
    return lines;
}

function peek(i) {
    let value = lines.at(i + 1);
    if (value) {
        value = value.trim();
    }
    return value;
}

exports.ParseLines = ParseLines;
exports.peek = peek;