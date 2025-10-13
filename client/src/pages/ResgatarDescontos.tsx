import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import RewardCard from "@/components/RewardCard";
import VoucherQRModal from "@/components/VoucherQRModal";
import { useAppData } from "@/lib/fake-data";
import { useToast } from "@/hooks/use-toast";
import type { Reward, Voucher } from "@shared/schema";

//todo: remove mock functionality
const mockRewards: Reward[] = [
  {
    id: "r1",
    titulo: "Voucher R$ 20 Loja",
    descricao: "Desconto de R$ 20 para usar na loja de conveniência",
    tipo: "Desconto Loja",
    valor: 20,
    litros_necessarios: 50,
    pontos_necessarios: 300
  },
  {
    id: "r2",
    titulo: "Café Grátis",
    descricao: "Um café grátis na loja de conveniência",
    tipo: "Café Grátis",
    valor: 0,
    litros_necessarios: 30,
    pontos_necessarios: 150
  },
  {
    id: "r3",
    titulo: "10% de Desconto",
    descricao: "10% de desconto no próximo abastecimento",
    tipo: "Desconto Abastecimento",
    valor: 0,
    litros_necessarios: 80,
    pontos_necessarios: 500
  },
  {
    id: "r4",
    titulo: "Voucher R$ 50 Loja",
    descricao: "Desconto de R$ 50 para usar na loja de conveniência",
    tipo: "Desconto Loja",
    valor: 50,
    litros_necessarios: 100,
    pontos_necessarios: 700
  }
];

export default function ResgatarDescontos() {
  const [, setLocation] = useLocation();
  const { user, setUser, addVoucher, addNotification } = useAppData();
  const { toast } = useToast();
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const handleRedeem = (reward: Reward) => {
    const newVoucher: Voucher = {
      id: `v${Date.now()}`,
      codigo: `SERR${reward.tipo.substring(0, 3).toUpperCase()}-${String(Date.now()).slice(-4)}`,
      tipo: reward.titulo,
      valor: reward.valor,
      status: "ativo",
      validade: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    };

    addVoucher(newVoucher);

    // Deduct points and liters
    setUser({
      ...user,
      pontos: user.pontos - reward.pontos_necessarios,
      litros_acumulados: user.litros_acumulados - reward.litros_necessarios,
    });

    // Add notification
    addNotification({
      id: `n${Date.now()}`,
      tipo: "voucher_gerado",
      titulo: "Voucher Gerado",
      mensagem: `Você resgatou: ${reward.titulo}`,
      data: new Date().toISOString(),
      lida: false,
    });

    toast({
      title: "Voucher Resgatado!",
      description: `${reward.titulo} foi adicionado aos seus vouchers`,
    });

    setSelectedVoucher(newVoucher);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Resgatar Descontos</h2>
        </div>

        <div className="bg-card border border-card-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Seus Pontos</p>
              <p className="text-2xl font-bold text-primary" data-testid="text-user-points">
                {user.pontos}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Litros Acumulados</p>
              <p className="text-2xl font-bold text-primary" data-testid="text-user-litros">
                {user.litros_acumulados}L
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Catálogo de Recompensas</h3>
          <div className="grid gap-4">
            {mockRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                userLitros={user.litros_acumulados}
                userPontos={user.pontos}
                onRedeem={() => handleRedeem(reward)}
              />
            ))}
          </div>
        </div>
      </main>

      {selectedVoucher && (
        <VoucherQRModal
          voucher={selectedVoucher}
          onClose={() => setSelectedVoucher(null)}
        />
      )}

      <BottomNav />
    </div>
  );
}
