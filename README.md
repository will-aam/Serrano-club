# Serrano Club - Protótipo de Fidelidade

Protótipo interativo mobile-first do programa de fidelidade Serrano Club, desenvolvido em React com interface totalmente em Português (pt-BR).

## 🎯 Visão Geral

Este é um protótipo visual e funcional que demonstra os fluxos completos do aplicativo de fidelidade, incluindo:

- ✅ Login e cadastro de usuários
- ✅ Dashboard com pontos e vouchers ativos
- ✅ Registro de abastecimentos via QR Code simulado
- ✅ Histórico de abastecimentos
- ✅ Catálogo de recompensas e resgate de vouchers
- ✅ Visualização de vouchers com QR Code
- ✅ Gerenciamento de perfil e veículos
- ✅ Central de notificações
- ✅ Painel administrativo para validação de vouchers (desktop)

## 📱 Telas Implementadas

### Cliente Mobile

1. **Login/Cadastro** (`/login`)
   - Login por telefone ou CPF
   - Cadastro com nome, telefone, email e placa

2. **Home** (`/`)
   - Saudação personalizada
   - Card de pontos e vouchers ativos
   - Barra de progresso de litros acumulados
   - Botões de ação principais

3. **Registrar Abastecimento** (`/registrar`)
   - Scanner QR Code simulado
   - Input manual de chave NFC-e
   - Validação com estados: sucesso, erro, duplicado
   - Dados parseados da nota fiscal
   - Confirmação de registro

4. **Meus Abastecimentos** (`/abastecimentos`)
   - Lista de abastecimentos com status
   - Detalhes completos de cada nota
   - Visualização de cupom fiscal simulado

5. **Resgatar Descontos** (`/resgatar`)
   - Catálogo de recompensas
   - Requisitos de pontos e litros
   - Modal de voucher com QR Code gerado

6. **Notificações** (`/notificacoes`)
   - Lista de notificações
   - Indicador de não lidas
   - Tipos: voucher gerado, usado, abastecimento registrado

7. **Perfil** (`/perfil`)
   - Edição de dados pessoais
   - Gerenciamento de veículos (adicionar/remover placas)
   - Vouchers ativos do usuário

### Admin Desktop

8. **Painel Admin** (`/admin`)
   - Scanner/input para código de voucher
   - Validação de vouchers
   - Lista filtrada por status (ativo/usado/expirado)
   - Seleção de forma de pagamento
   - Registro de auditoria com histórico

## 🗂️ Estrutura do Projeto

### Dados Simulados

Os dados fake estão centralizados em:
- **`client/src/lib/fake-data.tsx`** - Context Provider com todos os dados simulados

Para modificar os dados iniciais, edite as constantes:
```typescript
const initialUser = { ... }
const initialVehicles = [ ... ]
const initialPostos = [ ... ]
const initialAbastecimentos = [ ... ]
const initialVouchers = [ ... ]
const initialNotifications = [ ... ]
```

### Componentes Principais

Localização: `client/src/components/`

- `BottomNav.tsx` - Navegação inferior mobile
- `TopBar.tsx` - Barra superior com notificações
- `PointsCard.tsx` - Card de saldo de pontos
- `ProgressBar.tsx` - Barra de progresso de litros
- `QRScanner.tsx` - Interface de scanner QR simulada
- `AbastecimentoCard.tsx` - Card de abastecimento no histórico
- `VoucherCard.tsx` - Card de voucher
- `RewardCard.tsx` - Card de recompensa no catálogo
- `VoucherQRModal.tsx` - Modal com QR Code do voucher
- `NotificationItem.tsx` - Item de notificação

### Páginas

Localização: `client/src/pages/`

- `Login.tsx` - Tela de login/cadastro
- `Home.tsx` - Dashboard principal
- `RegistrarAbastecimento.tsx` - Registro de abastecimento
- `MeusAbastecimentos.tsx` - Histórico
- `ResgatarDescontos.tsx` - Catálogo de recompensas
- `Notificacoes.tsx` - Central de notificações
- `Perfil.tsx` - Perfil e configurações
- `Admin.tsx` - Painel administrativo

## 🎨 Design

O design segue as diretrizes em `design_guidelines.md`:

- **Cores**: Esquema deep red/orange (#E8632E) como primária
- **Tipografia**: Sistema nativo para performance
- **Layout**: Mobile-first, responsivo para desktop (admin)
- **Componentes**: Shadcn UI com Tailwind CSS
- **Ícones**: Lucide React
- **Acessibilidade**: Contraste WCAG AA, elementos focáveis

## 🚀 Como Usar

### Iniciar o Protótipo

1. O projeto já está configurado e rodando
2. Acesse as telas navegando pelas rotas:
   - `/login` - Login/Cadastro
   - `/` - Home (após login simulado)
   - `/registrar` - Registrar abastecimento
   - `/abastecimentos` - Histórico
   - `/resgatar` - Resgatar descontos
   - `/notificacoes` - Notificações
   - `/perfil` - Perfil
   - `/admin` - Painel Admin (desktop)

### Fluxos Simulados

**Registrar Abastecimento:**
1. Clique em "Registrar Abastecimento" na home
2. Clique em "Escanear NFC-e"
3. Clique em "Simular Escaneamento" (ou digite chave manual)
4. Veja os dados parseados
5. Clique em "Confirmar Registro"
6. Pontos são adicionados automaticamente

**Resgatar Voucher:**
1. Vá em "Resgatar Descontos"
2. Escolha uma recompensa disponível
3. Clique em "Resgatar"
4. Modal com QR Code aparece
5. Voucher é adicionado ao perfil

**Validar Voucher (Admin):**
1. Acesse `/admin`
2. Digite ou escaneie código do voucher
3. Selecione forma de pagamento
4. Clique em "Validar Voucher"
5. Registro aparece no log de auditoria

## 🔧 Customização

### Adicionar Novos Dados Mock

Edite `client/src/lib/fake-data.tsx` e adicione itens aos arrays iniciais.

**Exemplo - Adicionar posto:**
```typescript
const initialPostos: Posto[] = [
  // ... postos existentes
  { 
    cnpj: "12345678000199", 
    nome: "Posto Novo", 
    endereco: "Rua Nova, 100" 
  }
];
```

### Adicionar Novas Recompensas

Edite `client/src/pages/ResgatarDescontos.tsx` no array `mockRewards`:

```typescript
const mockRewards: Reward[] = [
  // ... recompensas existentes
  {
    id: "r5",
    titulo: "Nova Recompensa",
    descricao: "Descrição da recompensa",
    tipo: "Tipo",
    valor: 30,
    litros_necessarios: 60,
    pontos_necessarios: 400
  }
];
```

### Modificar Validações

As validações simuladas estão em:
- `RegistrarAbastecimento.tsx` - linha ~50 (validação de nota)
- `Admin.tsx` - função `handleValidate()` (validação de voucher)

## 📊 Dados de Exemplo

### Usuário Padrão
- Nome: William M.
- Telefone: 79 99999-9999
- Pontos: 420
- Litros acumulados: 78

### Vouchers Ativos
- SERR20-0001 - Desconto Loja R$ 20
- SERRCAF-0002 - Café Grátis (usado)

### Postos Cadastrados
- Posto Serrano Shell (CNPJ: 01234567000189)
- Posto São João (CNPJ: 98765432000155)

## 🧪 Testes

Todos os elementos interativos possuem `data-testid` para facilitar testes:
- Botões: `button-{acao}`
- Inputs: `input-{campo}`
- Textos: `text-{conteudo}`
- Cards: `card-{tipo}-{id}`

## 📝 Notas Técnicas

- **Estado Global**: Context API para dados simulados
- **Navegação**: Wouter (React Router alternativo)
- **Formulários**: React Hook Form não utilizado (forms simples)
- **QR Code**: qrcode.react para geração
- **Datas**: date-fns com locale pt-BR
- **Toasts**: Shadcn Toast para notificações

## ⚠️ Limitações do Protótipo

Este é um protótipo visual apenas:
- ❌ Sem backend real
- ❌ Sem banco de dados
- ❌ Sem autenticação real
- ❌ Sem integração com APIs de pagamento
- ❌ Dados resetam ao recarregar a página

Os comentários `//todo: remove mock functionality` indicam onde remover dados fake em implementação real.

## 🎯 Próximos Passos

Para transformar em aplicação real:
1. Implementar backend com API REST
2. Configurar banco de dados PostgreSQL
3. Adicionar autenticação JWT
4. Integrar scanner QR Code real (device camera)
5. Conectar API da SEFAZ para validação de NFC-e
6. Implementar sistema de notificações push
7. Adicionar analytics e monitoramento
