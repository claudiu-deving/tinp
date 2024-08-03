/* eslint-disable no-unused-vars */
const {
  createConnection,
  TextDocuments,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
} = require("vscode-languageserver/node");

const { TextDocument } = require("vscode-languageserver-textdocument");

const { validate } = require("./parser");
const { ParseLines } = require("./linesProvider");

// Create a connection for the server
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager
const documents = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;

connection.onInitialize((params) => {
  const capabilities = params.capabilities;

  hasConfigurationCapability = !!(
    capabilities.workspace && !!capabilities.workspace.configuration
  );
  hasWorkspaceFolderCapability = !!(
    capabilities.workspace && !!capabilities.workspace.workspaceFolders
  );

  const result = {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
    },
  };

  return result;
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent((change) => {
  validateTextDocument(change.document);
});

async function validateTextDocument(textDocument) {
  try {
    const text = textDocument.getText();
    let lines = ParseLines(text);
    const diagnostics = validate(lines);
    // Send the computed diagnostics to VSCode.
    await connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  } catch (ex) {
    console.log(ex);
  }
}

// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();
