import { createContext, useContext, useState, ReactNode } from "react";
import type { User, Vehicle, Posto, Abastecimento, Voucher, Notification } from "@shared/schema";

//todo: remove mock functionality
// Fake data as provided
const initialUser: User = {
  id: 1,
  nome: "William M.",
  telefone: "79 99999-9999",
  pontos: 420,
  litros_acumulados: 78,
  email: "william@example.com"
};

const initialVehicles: Vehicle[] = [
  { placa: "ABC1D23" },
  { placa: "XYZ9Z99" }
];

const initialPostos: Posto[] = [
  { cnpj: "01234567000189", nome: "Posto Serrano Shell", endereco: "Av. Central, 123" },
  { cnpj: "98765432000155", nome: "Posto São João", endereco: "R. Principal, 45" }
];

const initialAbastecimentos: Abastecimento[] = [
  {
    id: "a1",
    chave: "35241000000000000000000000000000000000001",
    posto_cnpj: "01234567000189",
    litros: 40,
    valor: 200,
    data: "2025-10-01T09:12:00",
    status: "registrado"
  },
  {
    id: "a2",
    chave: "35241000000000000000000000000000000000002",
    posto_cnpj: "01234567000189",
    litros: 38,
    valor: 190,
    data: "2025-10-08T18:03:00",
    status: "registrado"
  }
];

const initialVouchers: Voucher[] = [
  {
    id: "v1",
    codigo: "SERR20-0001",
    tipo: "Desconto Loja",
    valor: 20,
    status: "ativo",
    validade: "2025-11-01"
  },
  {
    id: "v2",
    codigo: "SERRCAF-0002",
    tipo: "Café Grátis",
    valor: 0,
    status: "usado",
    validade: "2025-09-30",
    data_validacao: "2025-09-25T10:00:00",
    funcionario: "João"
  }
];

const initialNotifications: Notification[] = [
  {
    id: "n1",
    tipo: "voucher_gerado",
    titulo: "Voucher Gerado",
    mensagem: "Você ganhou um voucher de R$ 20,00 na loja!",
    data: "2025-10-10T14:30:00",
    lida: false
  },
  {
    id: "n2",
    tipo: "abastecimento_registrado",
    titulo: "Abastecimento Registrado",
    mensagem: "Seu abastecimento de 38 litros foi registrado com sucesso!",
    data: "2025-10-08T18:03:00",
    lida: true
  }
];

const formasPagamento = ["Dinheiro", "Cartão", "PIX"];

interface AppContextType {
  user: User;
  setUser: (user: User) => void;
  vehicles: Vehicle[];
  setVehicles: (vehicles: Vehicle[]) => void;
  postos: Posto[];
  abastecimentos: Abastecimento[];
  setAbastecimentos: (abastecimentos: Abastecimento[]) => void;
  vouchers: Voucher[];
  setVouchers: (vouchers: Voucher[]) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  formasPagamento: string[];
  addAbastecimento: (abastecimento: Abastecimento) => void;
  addVoucher: (voucher: Voucher) => void;
  updateVoucher: (id: string, updates: Partial<Voucher>) => void;
  addNotification: (notification: Notification) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(initialUser);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [abastecimentos, setAbastecimentos] = useState<Abastecimento[]>(initialAbastecimentos);
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const addAbastecimento = (abastecimento: Abastecimento) => {
    setAbastecimentos(prev => [abastecimento, ...prev]);
  };

  const addVoucher = (voucher: Voucher) => {
    setVouchers(prev => [voucher, ...prev]);
  };

  const updateVoucher = (id: string, updates: Partial<Voucher>) => {
    setVouchers(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        vehicles,
        setVehicles,
        postos: initialPostos,
        abastecimentos,
        setAbastecimentos,
        vouchers,
        setVouchers,
        notifications,
        setNotifications,
        formasPagamento,
        addAbastecimento,
        addVoucher,
        updateVoucher,
        addNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within AppProvider");
  }
  return context;
}
