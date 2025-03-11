# Test Dashboard

Este projeto é um **Dashboard de Testes** que exibe um histórico de execuções de testes de software, permitindo visualizar rapidamente a quantidade de testes **Passing**, **Failing**, **Pending** e **Skipped**. Ele também armazena os resultados dos testes em um arquivo XML para referência futura.

## 📂 Estrutura do Projeto
```
/dashboard
│── index.html       # Interface do Dashboard
│── styles.css       # Estilos do Dashboard
│── script.js        # Lógica para leitura e atualização dos testes
└── test_history.xml # Histórico de testes (gerado automaticamente)
```

## 🚀 Tecnologias Utilizadas
- **HTML, CSS, JavaScript**
- **Bootstrap 5** (para estilização e layout responsivo)
- **XML** (para armazenamento do histórico de testes)

## 🎯 Funcionalidades
✅ Exibição da contagem de testes (Passing, Failing, Pending, Skipped).  
✅ Upload de novos testes para atualização do histórico.  
✅ Leitura automática do histórico armazenado em **test_history.xml**.  
✅ Tabela dinâmica para visualizar os detalhes de cada execução.

## 🛠 Como Usar
1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/test-dashboard.git
   cd test-dashboard
   ```
2. Abra o arquivo `index.html` em um navegador.
3. Cole os dados dos testes na área de texto e clique em "Registrar Histórico".
4. O histórico será salvo e exibido no dashboard.

## 📜 Formato dos Dados de Teste
Os dados dos testes devem ser colados no seguinte formato:
```
| ✔ Nome do Teste | HH:MM | Passing | Failing | Pending | Skipped | - |
```
Exemplo:
```
| ✔ Teste Login | 02:15 | 12 | 1 | 0 | 2 | - |
| ✔ Teste Checkout | 03:05 | 8 | 3 | 1 | 0 | - |
```

## ⚙️ Funcionamento Interno
- **`script.js`** faz a leitura dos dados inseridos e os converte para XML.
- O XML é atualizado com os novos testes sem sobrescrever o histórico antigo.
- Os dados são carregados automaticamente ao clicar no botão "Carregar Histórico de Testes".

## 📌 Melhorias Futuras
- Adicionar gráficos para melhor visualização dos dados.
- Criar uma API para armazenar os testes em um banco de dados.
- Implementar filtros e ordenação na tabela.

---
Desenvolvido com ❤️ por Gabriel Souza 🚀
