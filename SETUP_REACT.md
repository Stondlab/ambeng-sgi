# ⚡ SETUP RÁPIDO - AMBENG REACT APP

## 📋 PASSO A PASSO (10 minutos)

### 1️⃣ Criar Pasta do Projeto

```bash
mkdir ambeng-sgi
cd ambeng-sgi
```

### 2️⃣ Copiar Arquivos

Copie todos os arquivos que foram gerados para dentro da pasta `ambeng-sgi`:

```
ambeng-sgi/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   └── KanbanBoard.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .env.example
├── .gitignore
└── README.md
```

### 3️⃣ Instalar Dependências

```bash
npm install
```

⏱️ Vai demorar uns 2-3 minutos... esperando...

### 4️⃣ Configurar Supabase

Copie `.env.example` pra `.env.local`:

```bash
cp .env.example .env.local
```

Abra `.env.local` no seu editor e preencha:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

(Copie essas chaves do seu projeto Supabase Dashboard)

### 5️⃣ Rodar o App

```bash
npm run dev
```

Vai aparecer:
```
  VITE v4.4.5  ready in 123 ms
  ➜  Local:   http://localhost:5173/
```

### 6️⃣ Abrir no Navegador

Clica em http://localhost:5173/ ou abre manualmente

---

## ✅ PRONTO!

Você deve ver:
- ✅ Dashboard com KPIs
- ✅ Kanban Board
- ✅ 4 abas na parte inferior
- ✅ Dados conectados com Supabase

---

## 🆘 SE NÃO FUNCIONAR

### Erro: "Cannot find module"
```bash
npm install
```

### Erro: "Missing environment variables"
- Verifique se `.env.local` existe
- Verifique se tem as 2 chaves preenchidas
- Reinicie o servidor (Ctrl+C, depois `npm run dev`)

### Erro: "Cannot connect to Supabase"
- Verifique as chaves no `.env.local`
- Verifique se Supabase está online
- Verifique se o projeto Supabase existe

---

## 🚀 PRÓXIMOS PASSOS

1. **Testar o app:**
   - Clica em "+ Nova Ação"
   - Arrasta tarefas entre colunas
   - Vê os KPIs atualizarem

2. **Adicionar mais features:**
   - Login
   - Upload de arquivos
   - Notificações
   - Relatórios

3. **Deploy em produção:**
   - Vercel (recomendado)
   - Netlify
   - Sua própria infra

---

**Tá pronto? Avisa que rodou com sucesso!** 🎉
