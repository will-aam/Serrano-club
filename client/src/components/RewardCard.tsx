import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Droplet, Star } from "lucide-react";
import type { Reward } from "@shared/schema";

interface RewardCardProps {
  reward: Reward;
  userLitros: number;
  userPontos: number;
  onRedeem: () => void;
}

export default function RewardCard({ reward, userLitros, userPontos, onRedeem }: RewardCardProps) {
  const canRedeem = userLitros >= reward.litros_necessarios && userPontos >= reward.pontos_necessarios;

  return (
    <Card className="p-4 space-y-3" data-testid={`card-reward-${reward.id}`}>
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-3 rounded-lg">
          <Gift className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold mb-1" data-testid={`text-reward-titulo-${reward.id}`}>
            {reward.titulo}
          </h4>
          <p className="text-sm text-muted-foreground" data-testid={`text-reward-descricao-${reward.id}`}>
            {reward.descricao}
          </p>
        </div>
      </div>

      {reward.valor > 0 && (
        <div className="text-2xl font-bold text-primary" data-testid={`text-reward-valor-${reward.id}`}>
          R$ {reward.valor.toFixed(2)}
        </div>
      )}

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Droplet className="w-4 h-4 text-muted-foreground" />
          <span className={userLitros >= reward.litros_necessarios ? "text-primary font-semibold" : "text-muted-foreground"}>
            {reward.litros_necessarios}L
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-muted-foreground" />
          <span className={userPontos >= reward.pontos_necessarios ? "text-primary font-semibold" : "text-muted-foreground"}>
            {reward.pontos_necessarios} pts
          </span>
        </div>
      </div>

      <Button
        onClick={onRedeem}
        disabled={!canRedeem}
        className="w-full"
        data-testid={`button-redeem-${reward.id}`}
      >
        {canRedeem ? "Resgatar" : "Pontos/Litros Insuficientes"}
      </Button>
    </Card>
  );
}
