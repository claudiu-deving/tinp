const { DiagnosticSeverity } = require('vscode-languageserver');

function ComposeDiagnosticError(message, i, line) {
    return {
        isSuccessful: false,
        diagnostic: {
            severity: DiagnosticSeverity.Error,
            range: {
                start: { line: i, character: 0 },
                end: { line: i, character: line.length }
            },
            message: message,
            source: 'TINP Linter'
        }
    };
}

exports.ComposeDiagnosticError = ComposeDiagnosticError