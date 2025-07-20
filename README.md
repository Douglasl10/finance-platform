<h1 align="center">Dev Finace</h1>
Aplicativo web de gerenciamento financeiro, construído com tecnologias modernas (Next.js, React, Hono.js) para oferecer controle completo sobre suas finanças pessoais ou pequenas empresas 📊.

<h2>🔎 Visão Geral</h2>
O Finance‑Platform é um sistema robusto para registrar e analisar receitas e despesas. Inspirado no tutorial “Code With Antonio” 
GitHub
+
1
GitHub
+
1
, o projeto oferece recursos completos para monitorar transações, importar dados, se conectar com contas bancárias e mais.

<h2>✅ Funcionalidades principais</h2>
Dashboard financeiro interativo com gráficos personalizáveis (tipo de gráficos, filtros por conta e dados) 
GitHub

Tabela de transações com busca, filtros e paginação para facilitar o controle financeiro

Formulário de inserção de transações — receitas e despesas

Importação de CSV para atualização rápida do histórico financeiro 
GitHub

API construída com Hono.js , ideal para nível back-end 
GitHub
+
1
GitHub
+
1

Gerenciamento de estado via TanStack React Query para sincronização eficiente 
GitHub

Autenticação com Clerk (Core 2) para login seguro 
GitHub
+
1
GitHub
+
1

Conexão com contas bancárias via Plaid (configuração necessária) 
GitHub

Monetização com Lemon Squeezy — disponibiliza planos premium 
GitHub

<h2>🛠️ Tecnologias</h2>
Frontend : Next.js + React

Backend/API : Hono.js

Estado : Consulta React (TanStack)

Autenticação : Clerk

Banco de dados/ORM : você pode usar SQLite, Postgres etc.

Banco bancário : integração com Plaid

Pagamentos : Lemon Squeezy

Importação de dados : leitura de CSV

Visualização : bibliotecas de gráficos (ex: Chart.js, Recharts)

<h2>🚀 Começando</h2>
Clonar ou repositório

Instalar dependências: npm install
Iniciar o servidor de desenvolvimento: npm run dev

🔧 Configurar variáveis de ambiente:

CLERK_*(para autenticação)

PLAID_*(para integração bancária)

LEMON_SQUEEZY_*(para planos)

<h2>📂 Estrutura típica</h2>

/
├─ pages/             # Frontend Next.js
├─ components/        # UI compartilhadas
├─ lib/               # Configurações (Clerk, Plaid, etc.)
├─ api/               # Rotas Hono.js (backend)
├─ prisma/ ou db/     # Configuração de banco
├─ public/            # Arquivos estáticos
├─ scripts/           # Scripts auxiliares (importação CSV etc.)
└─ README.md

<h2>🎁 Próximos Passos</h2>
Implantar em Vercel ou similar

Suporte a multiusuários e equipes

App móvel com React Native ou Flutter

Funções analíticas e relatórios financeiros avançados

<h2> 🖼️ Preview</h2>

<img src=".../assets/DevFinance.png" alt="DevFinance">