// Gera o .docx da coluna do dia a partir do .md correspondente.
// Uso: node scripts/gerar-docx.js coluna/AAAA-MM-DD.md
// Sem argumento, usa a data de hoje.

const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun } = require("docx");

const LIMITE = 1400;

function hoje() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const entrada = process.argv[2] || path.join("coluna", `${hoje()}.md`);

if (!fs.existsSync(entrada)) {
  console.error(`Arquivo nao encontrado: ${entrada}`);
  process.exit(1);
}

const texto = fs.readFileSync(entrada, "utf8").replace(/\r\n/g, "\n").trim();
const linhas = texto.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);

if (linhas.length < 3) {
  console.error("O arquivo precisa ter ao menos titulo, data e um paragrafo.");
  process.exit(1);
}

const titulo = linhas[0].replace(/^\*\*|\*\*$/g, "");
const data = linhas[1];
const corpo = linhas.slice(2);

// O teto de 1400 caracteres e regra do agente colunista, conferida aqui na maquina.
const total = texto.length;
if (total > LIMITE) {
  console.error(`A coluna tem ${total} caracteres e o teto e ${LIMITE}. Corte antes de gerar o .docx.`);
  process.exit(1);
}

const paragrafos = [
  new Paragraph({
    children: [new TextRun({ text: titulo, bold: true, size: 28 })],
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: data, color: "808080", size: 22 })],
    spacing: { after: 240 },
  }),
];

for (const linha of corpo) {
  const ehFonte = /^Fonte/i.test(linha);
  paragrafos.push(
    new Paragraph({
      children: [new TextRun({ text: linha, size: ehFonte ? 20 : 22 })],
      spacing: { after: ehFonte ? 0 : 200 },
    })
  );
}

const doc = new Document({ sections: [{ children: paragrafos }] });
const saida = entrada.replace(/\.md$/, ".docx");

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(saida, buffer);
  console.log(`${saida} gerado. ${total} caracteres, teto de ${LIMITE}.`);
});
