const fs = require('fs');
const filePath = './node_modules/@swimlane/ngx-datatable/package.json';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.log('Erro ao ler o package.json do ngx-datatable:', err);
  }
  const packageJson = JSON.parse(data);
  packageJson.fesm2015 = packageJson.fesm2020; // Adiciona a propriedade ausente
  
  const result = JSON.stringify(packageJson, null, 2);

  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) return console.log('Erro ao escrever o patch no package.json do ngx-datatable:', err);
    console.log('Patch aplicado com sucesso ao ngx-datatable.');
  });
});