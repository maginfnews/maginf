# 🧭 Portal MAGINF

Portal de monitoramento centralizado para clientes MAGINF - Tecnologia e segurança 24h.

## 🎯 Objetivo

Ser o painel de monitoramento centralizado onde o cliente da MAGINF pode:
- Ver status em tempo real dos servidores e estações
- Acompanhar backups, alertas, inventário e tickets
- Receber relatórios e métricas personalizadas com a marca MAGINF
- Servir de vitrine de profissionalismo e confiança ("transparência tecnológica")

## 🎨 Identidade Visual

- **Laranja (#ff6a00)** — principal (energia, tecnologia)
- **Cinza-escuro (#2d2d2d)** — fundo principal (tecnologia e contraste)
- **Cinza-claro (#d9d9d9)** — bordas e ícones
- **Branco (#ffffff)** — texto e elementos ativos

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# 1. Instalar dependências
npm install

# 2. Configurar ambiente
cp .env.example .env.local

# 3. Executar em desenvolvimento
npm run dev

# 4. Acessar
# http://localhost:3000
```

### Build para Produção
```bash
npm run build
npm start
```

## 🧱 Arquitetura de Telas

### ✅ Implementado
- 🔐 **Tela de Login** - Autenticação com email/senha
- 📊 **Dashboard Principal** - Resumo geral com cards e gráficos
- 🖥️ **Servidores & Estações** - Tabela detalhada com métricas
- 📱 **Layout Responsivo** - Sidebar colapsável e header

### 🚧 Em Desenvolvimento
- 🧾 **Inventário & Backup** - Hardware, software e status de backup
- 🚨 **Alertas & Incidentes** - Sistema de alertas por gravidade
- 📈 **Relatórios** - Gráficos interativos e exportação PDF
- 💬 **Suporte** - Sistema de chamados integrado

## 🔧 Tecnologias

- **Frontend**: Next.js 14 + TypeScript
- **Styling**: TailwindCSS + CSS customizado
- **Gráficos**: Recharts
- **Ícones**: Lucide React
- **Animações**: Framer Motion
- **Data Fetching**: SWR

## 📊 Funcionalidades Atuais

### Dashboard Principal
- ✅ Cards de status (Servidores, Estações, Backups, Alertas)
- ✅ Gráfico de disponibilidade (7 dias)
- ✅ Gráfico de status de backup (pie chart)
- ✅ Lista de alertas recentes
- ✅ Métricas em tempo real

### Servidores & Estações
- ✅ Tabela com filtros (Servidores/Estações)
- ✅ Métricas de CPU, Memória, Disco
- ✅ Status visual (Online/Offline/Aviso)
- ✅ Informações de uptime
- ✅ Último check-in

### Autenticação
- ✅ Tela de login responsiva
- ✅ Validação de formulário
- ✅ Estado de loading
- ✅ Tratamento de erros

## 🎨 Componentes Customizados

### Classes CSS MAGINF
```css
.btn-maginf          /* Botão principal laranja */
.btn-maginf-outline  /* Botão outline laranja */
.card-maginf         /* Card com sombra e bordas */
.status-online       /* Badge verde para online */
.status-warning      /* Badge amarelo para aviso */
.status-offline      /* Badge vermelho para offline */
```

### Cores Personalizadas
```css
maginf-orange        /* #ff6a00 */
maginf-dark          /* #2d2d2d */
maginf-gray          /* #d9d9d9 */
status-online        /* #10b981 */
status-warning       /* #f59e0b */
status-offline       /* #ef4444 */
```

## 📱 Responsividade

- ✅ **Mobile First** - Design otimizado para dispositivos móveis
- ✅ **Sidebar Colapsável** - Navegação adaptável
- ✅ **Tabelas Responsivas** - Scroll horizontal em telas pequenas
- ✅ **Grid Adaptativo** - Cards se reorganizam automaticamente

## 🔮 Próximas Implementações

### Integrações API
- [ ] Site24x7 (monitoramento)
- [ ] ManageEngine (inventário)
- [ ] N-able Cove (backup)
- [ ] Sistema de tickets próprio

### Funcionalidades
- [ ] Autenticação real (NextAuth)
- [ ] Banco de dados (Supabase)
- [ ] Notificações push
- [ ] Relatórios PDF
- [ ] White label por cliente
- [ ] Modo escuro

## 📞 Suporte

Para dúvidas sobre o Portal MAGINF:
- **Email**: suporte@maginf.com.br
- **Site**: https://maginf.com.br

---

**© 2024 MAGINF Tecnologia. Todos os direitos reservados.**
