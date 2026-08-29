# 🚀 AMBENG SGI SST - React App

Sistema de Gestão de Segurança e Saúde do Trabalho para Construtoras

---

## 📋 ANTES DE COMEÇAR

✅ Você tem Node.js instalado?
```bash
node --version
```

Se não, baixe em: https://nodejs.org/

---

## 🚀 SETUP (5 minutos)

### 1. Clonar ou Baixar os Arquivos

```bash
# Se tiver git:
git clone <seu-repo>
cd ambeng-sgi

# Ou só copiar os arquivos pra uma pasta
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Supabase

**Copie o arquivo `.env.example` para `.env.local`:**

```bash
cp .env.example .env.local
```

**Abra `.env.local` e preencha com suas chaves Supabase:**

```
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY_AQUI
```

### 4. Rodar o App

```bash
npm run dev
```

**Resultado:**
```
  VITE v4.4.5  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Abre o navegador em:** http://localhost:5173/

---

## 📱 O QUE VOCÊ VAI VER

### **Painel (Dashboard)**
- KPIs em tempo real
- Tarefas recentes
- Atalhos rápidos

### **Operações (Kanban)**
- Quadro Kanban com drag-drop
- 4 colunas: Novo, A Fazer, Em Andamento, Concluído
- Filtros por prioridade

### **SST (Em desenvolvimento)**
- Exames ocupacionais
- Conformidade
- Auditorias

### **RH (Em desenvolvimento)**
- Gestão de pessoas
- Departamentos
- Treinamentos

---

## 🔧 ESTRUTURA DO PROJETO

```
ambeng-sgi/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx       # Dashboard com KPIs
│   │   └── KanbanBoard.jsx     # Kanban board
│   ├── lib/
│   │   └── supabase.js         # Conexão com Supabase
│   ├── App.jsx                 # App principal
│   ├── main.jsx                # Entrada React
│   ├── App.css                 # Estilos do App
│   └── index.css               # Estilos globais
├── package.json                # Dependências
├── vite.config.js              # Config Vite
├── tailwind.config.js          # Config Tailwind
├── postcss.config.js           # Config PostCSS
├── .env.example                # Template de env
├── index.html                  # HTML principal
└── README.md                   # Este arquivo
```

---

## 🚀 COMANDOS DISPONÍVEIS

```bash
# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## 📊 PRÓXIMAS FEATURES

- [ ] Login/Autenticação
- [ ] Upload de arquivos
- [ ] Notificações real-time
- [ ] Relatórios
- [ ] Automações
- [ ] Mobile app

---

## 🆘 TROUBLESHOOTING

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install
```

### "Missing Supabase environment variables"
Verifique o arquivo `.env.local`:
- Tem `VITE_SUPABASE_URL`?
- Tem `VITE_SUPABASE_ANON_KEY`?

### Porta 5173 já em uso?
```bash
npm run dev -- --port 3000
```

---

## 📞 SUPORTE

Se tiver problemas:
1. Verifique as variáveis de ambiente
2. Reinicie o servidor (`Ctrl+C`, depois `npm run dev`)
3. Limpe o cache (`rm -rf node_modules`, depois `npm install`)

---

## 📝 LICENÇA

Todos os direitos reservados - AMBENG Construções


✨ App ready for deployment!
