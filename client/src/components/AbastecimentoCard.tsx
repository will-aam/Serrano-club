import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, Fuel, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Abastecimento } from "@shared/schema";

interface AbastecimentoCardProps {
  abastecimento: Abastecimento;
  postoNome: string;
  onClick?: () => void;
}

export default function AbastecimentoCard({ abastecimento, postoNome, onClick }: AbastecimentoCardProps) {
  const statusColors = {
    registrado: "default",
    pendente: "secondary",
    rejeitado: "destructive",
  } as const;

  const statusLabels = {
    registrado: "Registrado",
    pendente: "Pendente",
    rejeitado: "Rejeitado",
  };

  return (
    <Card
      className="p-4 hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid={`card-abastecimento-${abastecimento.id}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="bg-accent p-2 rounded-lg">
            <Building2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate" data-testid={`text-posto-${abastecimento.id}`}>
              {postoNome}
            </h4>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Calendar className="w-3 h-3" />
              <span>{format(new Date(abastecimento.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</span>
            </div>
          </div>
        </div>
        <Badge variant={statusColors[abastecimento.status]} data-testid={`badge-status-${abastecimento.id}`}>
          {statusLabels[abastecimento.status]}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1">
          <Fuel className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold" data-testid={`text-litros-${abastecimento.id}`}>
            {abastecimento.litros}L
          </span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span className="font-semibold" data-testid={`text-valor-${abastecimento.id}`}>
            R$ {abastecimento.valor.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
}
