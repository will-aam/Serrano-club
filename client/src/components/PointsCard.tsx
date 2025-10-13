import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";

interface PointsCardProps {
  pontos: number;
  vouchersAtivos: number;
}

export default function PointsCard({ pontos, vouchersAtivos }: PointsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm opacity-90 mb-1">Saldo de Pontos</p>
          <p className="text-4xl font-bold" data-testid="text-points-balance">
            {pontos}
          </p>
        </div>
        <div className="bg-primary-foreground/20 p-3 rounded-lg">
          <Wallet className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="bg-primary-foreground/20 px-3 py-1 rounded-full">
          <span className="font-semibold" data-testid="text-active-vouchers">
            {vouchersAtivos} vouchers ativos
          </span>
        </div>
      </div>
    </Card>
  );
}
