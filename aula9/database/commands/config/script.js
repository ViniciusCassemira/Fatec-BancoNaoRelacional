const fs = require('fs');
const path = require('path');

const filePath = '../../json/temp.json'; // ou dados.txt
const EXT = path.extname(filePath);

function processarJSON(content) {
  const data = JSON.parse(content);
  const atualizado = data.map(obj => ({ ...obj, _id: obj._id + 12000 }));
  return JSON.stringify(atualizado, null, 2);
}

function processarTXT(content) {
  const linhas = content.trim().split('\n');
  const atualizado = linhas.map(linha => {
    const obj = JSON.parse(linha);
    obj._id += 1000;
    return JSON.stringify(obj);
  });
  return atualizado.join('\n');
}

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  let resultado;
  if (EXT === '.json') {
    resultado = processarJSON(data);
  } else if (EXT === '.txt') {
    resultado = processarTXT(data);
  } else {
    console.error('Formato de arquivo não suportado.');
    return;
  }

  const novoNome = `saida_${path.basename(filePath)}`;
  fs.writeFile(novoNome, resultado, err => {
    if (err) {
      console.error('Erro ao salvar o arquivo:', err);
    } else {
      console.log(`Arquivo processado e salvo como: ${novoNome}`);
    }
  });
});