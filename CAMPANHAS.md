# 🎯 Gerenciamento de Campanhas Sazonais

## 📋 Campanhas Disponíveis

### 1. Novembro Azul 💙
- **Arquivo**: `src/components/NovenbroAzul.js`
- **Tema**: Conscientização sobre câncer de próstata
- **Cores**: Azul e ciano
- **Ícones**: Shield, Heart, Users, Award, Stethoscope
- **Período sugerido**: Novembro

### 2. Natal 🎄
- **Arquivo**: `src/components/CampanhaNatal.js`
- **Tema**: Feliz Natal e Ano Novo
- **Cores**: Vermelho, verde e dourado
- **Ícones**: Gift, Sparkles, Star, TreePine, Heart, Snowflake
- **Período sugerido**: Dezembro

## ⚙️ Como Ativar/Desativar Campanhas

### Método Simples
Edite o arquivo `src/components/CampanhaManager.js`:

```javascript
const CAMPANHAS_ATIVAS = {
  novenbroAzul: true,  // true = ativa | false = desativa
  natal: true,         // true = ativa | false = desativa
};
```

### Exemplos de Uso

**Apenas Novembro Azul:**
```javascript
const CAMPANHAS_ATIVAS = {
  novenbroAzul: true,
  natal: false,
};
```

**Apenas Natal:**
```javascript
const CAMPANHAS_ATIVAS = {
  novenbroAzul: false,
  natal: true,
};
```

**Ambas ativas (aparecerão uma abaixo da outra):**
```javascript
const CAMPANHAS_ATIVAS = {
  novenbroAzul: true,
  natal: true,
};
```

**Nenhuma campanha:**
```javascript
const CAMPANHAS_ATIVAS = {
  novenbroAzul: false,
  natal: false,
};
```

## 🎨 Criar Nova Campanha

### 1. Criar componente
Crie um novo arquivo em `src/components/` seguindo o padrão:
- `CampanhaCarnaval.js`
- `CampanhaPascoa.js`
- `CampanhaDiadasMaes.js`
- etc.

### 2. Estrutura base
Use como referência os componentes existentes:
- Ícones animados
- Mensagens rotativas
- Gradientes temáticos
- Botão de fechar
- Responsivo

### 3. Adicionar ao gerenciador
Edite `src/components/CampanhaManager.js`:

```javascript
import NovaCampanha from './NovaCampanha';

const CAMPANHAS_ATIVAS = {
  novenbroAzul: true,
  natal: true,
  novaCampanha: true,  // Adicione aqui
};

const CampanhaManager = () => {
  return (
    <>
      {CAMPANHAS_ATIVAS.novenbroAzul && <NovenbroAzul />}
      {CAMPANHAS_ATIVAS.natal && <CampanhaNatal />}
      {CAMPANHAS_ATIVAS.novaCampanha && <NovaCampanha />}
    </>
  );
};
```

## 📅 Calendário Sugerido de Campanhas

| Mês | Campanha | Tema |
|-----|----------|------|
| Janeiro | Ano Novo | Metas e objetivos |
| Fevereiro | Carnaval | Celebração |
| Março | Dia da Mulher | Empoderamento feminino |
| Abril | Páscoa | Renovação |
| Maio | Dia das Mães | Homenagem |
| Junho | Festa Junina | Tradição |
| Julho | Férias | Descanso |
| Agosto | Dia dos Pais | Homenagem |
| Setembro | Setembro Amarelo | Saúde mental |
| Outubro | Outubro Rosa | Câncer de mama |
| Novembro | Novembro Azul | Câncer de próstata |
| Dezembro | Natal | Celebração |

## 🚀 Deploy

Após ativar/desativar campanhas:

1. Salve as alterações
2. Teste localmente: `npm start`
3. Build: `npm run build`
4. Deploy para produção

## 💡 Dicas

- **Múltiplas campanhas**: Podem ficar ativas simultaneamente
- **Ordem de exibição**: Segue a ordem no `CampanhaManager`
- **Usuário pode fechar**: Cada banner tem botão X
- **Responsivo**: Todas as campanhas se adaptam a mobile
- **Performance**: Campanhas desativadas não são carregadas

## 🎨 Paleta de Cores MAGINF

Para manter consistência com a identidade visual:

- **Laranja**: `#e35300` (CTA principal)
- **Cinza**: `#2C3E50` (Institucional)
- Use cores temáticas nas campanhas, mas mantenha a tipografia e espaçamentos

---

**Última atualização**: Novembro 2025
**Desenvolvido por**: MAGINF - Tecnologia e Inovação
