# Dashboard Multi-API "Status de Backup" - MAGINF

Dashboard Next.js para monitoramento unificado de status de backup de servidores (via N-able Cove) e estações de trabalho (via API configurável).

## 🚀 Funcionalidades

- **Visão Unificada**: Consolida dados de múltiplas APIs em uma interface única
- **KPIs Inteligentes**: Métricas agregadas e por fonte de dados
- **Filtros Avançados**: Busca por nome, status, fonte e tipo de dispositivo
- **Responsivo**: Interface otimizada para desktop e mobile
- **Tempo Real**: Atualização automática com cache inteligente
- **Segurança**: Rate limiting, sanitização e variáveis de ambiente

## 📊 Fontes de Dados

### Fonte A - N-able Cove (Servidores)
- **API**: JSON-RPC
- **Endpoint**: `https://api.backup.management/jsonapi`
- **Autenticação**: Login com visa (15min TTL)
- **Dados**: Status de backup de servidores

### Fonte B - API Configurável (Estações)
- **API**: REST configurável
- **Endpoint**: Definido via `B_API_BASE`
- **Autenticação**: Bearer token
- **Dados**: Status de backup de workstations

## 🛠️ Instalação

### 1. Clonar e Instalar
```bash
git clone <repository>
cd dashboard-backup
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais:
```env
# Cove (API A)
COVE_PARTNER=12345
COVE_USER=seu_usuario
COVE_PASS=sua_senha

# API B (Workstations)
B_API_BASE=https://api.workstations.example.com
B_API_TOKEN=seu_token_api_b
```

### 3. Executar
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📱 Uso

### Acessar Dashboard
```
http://localhost:3000/clientes/[partnerId]/backups
```

### Parâmetros de URL
- `q`: Busca por nome do dispositivo
- `status`: Filtro por status (`Success`, `Failed`, etc.)
- `source`: Filtro por fonte (`A`, `B` ou vazio para todas)
- `page`: Número da página
- `pageSize`: Itens por página (máx 200)

### Exemplo
```
/clientes/123/backups?q=servidor&status=Failed&source=A&page=1&pageSize=50
```

## 🔧 API Endpoints

### GET `/api/cliente/[partnerId]/backups`
Retorna dados agregados de backup com KPIs.

**Resposta:**
```json
{
  "items": [
    {
      "id": "A:servidor01",
      "deviceName": "servidor01",
      "kind": "Server",
      "source": "A",
      "lastStatus": "Success",
      "lastCompletedAt": "2025-10-20T10:00:00Z"
    }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "pageSize": 50,
    "lastSyncAt": "2025-10-20T10:30:00Z"
  },
  "kpis": {
    "general": {
      "total": 150,
      "success": 120,
      "warnings": 15,
      "failed": 10,
      "inProgress": 3,
      "neverRun": 2
    },
    "bySource": {
      "A": { "total": 80, "success": 70, ... },
      "B": { "total": 70, "success": 50, ... }
    }
  }
}
```

## 🏗️ Arquitetura

### Camada de Providers
```typescript
interface BackupProvider {
  listStatus(params: {
    partnerId: string | number;
    q?: string;
    status?: BackupStatus;
    page?: number;
    pageSize?: number;
  }): Promise<{ items: BackupItem[]; total: number }>;
}
```

### Modelo de Dados
```typescript
interface BackupItem {
  id: string;
  deviceName: string;
  kind: "Server" | "Workstation";
  source: "A" | "B";
  lastStatus: BackupStatus;
  lastCompletedAt?: string;
  raw?: any;
}
```

## 🔒 Segurança

- **Rate Limiting**: 60 requests/minuto por IP
- **Sanitização**: Todos os parâmetros são sanitizados
- **Variáveis de Ambiente**: Credenciais apenas no servidor
- **Headers de Segurança**: XSS, CSRF, Content-Type protection

## 🎨 Componentes

### KPICards
Exibe métricas agregadas e por fonte.

### BackupFilters
Filtros de busca, status e fonte com debounce.

### BackupTable
Tabela responsiva com paginação e ordenação.

### Pagination
Navegação entre páginas com seletor de itens.

## 🌐 Internacionalização

- **Timezone**: America/Sao_Paulo
- **Formato de Data**: dd/MM/yyyy HH:mm
- **Idioma**: Português brasileiro
- **Acessibilidade**: Contraste AA, aria-labels

## 🔄 Cache e Performance

- **SWR**: Cache inteligente com revalidação
- **Refresh**: Automático a cada 30 segundos
- **Debounce**: 300ms para filtros de busca
- **Paginação**: Máximo 200 itens por página

## 📝 Logs e Debug

### Desenvolvimento
```bash
# Logs detalhados no console
npm run dev
```

### Produção
- Logs de erro sem informações sensíveis
- Rate limiting registrado
- Falhas de provider não quebram o dashboard

## 🧪 Testes

### Testar Providers Individualmente
```bash
# Teste do Cove Provider
curl "http://localhost:3000/api/cliente/123/backups?source=A"

# Teste do Workstation Provider  
curl "http://localhost:3000/api/cliente/123/backups?source=B"
```

### Testar Rate Limiting
```bash
# Fazer 61 requests em 1 minuto
for i in {1..61}; do curl "http://localhost:3000/api/cliente/123/backups"; done
```

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📞 Suporte

- **Documentação**: Este README
- **Issues**: GitHub Issues
- **Contato**: suporte@maginf.com.br

## 📄 Licença

Propriedade da MAGINF Tecnologia - Todos os direitos reservados.
