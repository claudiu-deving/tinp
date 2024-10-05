import { DiagnosticSeverity, Range, Position, Diagnostic } from 'vscode-languageserver';

export function ComposeDiagnosticError(message: any, i: any, line: any): Diagnostic {
    return Diagnostic.create(Range.create(
        Position.create(i, 0),
        Position.create(i, line.length)
    ), message, DiagnosticSeverity.Error, '', 'TINP Linter');
}


exports.ComposeDiagnosticError = ComposeDiagnosticError;