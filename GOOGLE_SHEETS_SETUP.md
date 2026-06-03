# Como salvar os diagnósticos no Google Sheets

## 1. Criar a planilha

1. Acesse o Google Sheets.
2. Crie uma nova planilha.
3. Dê um nome, por exemplo: `Diagnósticos MUV`.

## 2. Criar o Apps Script

1. Dentro da planilha, clique em `Extensões` > `Apps Script`.
2. Apague o código inicial.
3. Cole o conteúdo do arquivo `google-apps-script.gs`.
4. Salve o projeto.

Importante: crie o Apps Script a partir da planilha. O código usa `SpreadsheetApp.getActiveSpreadsheet()` para gravar na planilha aberta.

## 3. Publicar como Web App

1. No Apps Script, clique em `Implantar` > `Nova implantação`.
2. Em `Tipo`, escolha `App da Web`.
3. Em `Executar como`, selecione `Eu`.
4. Em `Quem pode acessar`, selecione `Qualquer pessoa`.
5. Clique em `Implantar`.
6. Autorize as permissões solicitadas.
7. Copie a URL gerada do Web App. Ela termina com `/exec`.

## 4. Configurar a URL no site

No arquivo `index.html`, encontre:

```js
const SHEETS_WEBHOOK_URL = '';
```

Substitua pelo link do Web App:

```js
const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/SEU_ID_DO_DEPLOY/exec';
```

## 5. Testar

1. Abra o site.
2. Preencha um diagnóstico até chegar no resultado final.
3. Volte para a planilha.
4. Confira se uma nova linha apareceu na aba `Diagnosticos`.

## Observações

- O envio acontece quando o usuário conclui o diagnóstico.
- As respostas não ficam salvas no navegador do usuário.
- A URL do Web App pode receber envios públicos, então não divulgue esse link fora do site.
- Se alterar o código do Apps Script depois, publique uma nova versão da implantação.
