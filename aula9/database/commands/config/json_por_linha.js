const fs = require('fs');

const entrada = 'saida_temp.json';
const saida = 'proprietarios_linha.txt';

fs.readFile(entrada, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }

  try {
    const objetos = JSON.parse(data);

    if (!Array.isArray(objetos)) {
      throw new Error("O arquivo JSON deve conter um array de objetos.");
    }

    const linhas = objetos.map(obj => JSON.stringify(obj) + ',').join('\n');

    fs.writeFile(saida, linhas, err => {
      if (err) {
        console.error('Erro ao escrever o arquivo de saída:', err);
      } else {
        console.log(`Arquivo salvo com sucesso com vírgulas no final: ${saida}`);
      }
    });
  } catch (e) {
    console.error('Erro ao processar JSON:', e.message);
  }
});
