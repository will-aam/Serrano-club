import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Voucher } from "@shared/schema";

interface VoucherCardProps {
  voucher: Voucher;
  onClick?: () => void;
}

export default function VoucherCard({ voucher, onClick }: VoucherCardProps) {
  const statusColors = {
    ativo: "default",
    usado: "secondary",
    expirado: "destructive",
  } as const;

  const statusLabels = {
    ativo: "Ativo",
    usado: "Usado",
    expirado: "Expirado",
  };

  const isExpiringSoon = () => {
    if (voucher.status !== "ativo") return false;
    const validadeDate = new Date(voucher.validade);
    const now = new Date();
    const diffDays = Math.ceil((validadeDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <Card
      className="p-4 hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid={`card-voucher-${voucher.id}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-lg ${voucher.status === "ativo" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          <Gift className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold" data-testid={`text-voucher-tipo-${voucher.id}`}>
              {voucher.tipo}
            </h4>
            <Badge variant={statusColors[voucher.status]} data-testid={`badge-voucher-status-${voucher.id}`}>
              {statusLabels[voucher.status]}
            </Badge>
          </div>
          
          {voucher.valor > 0 && (
            <p className="text-2xl font-bold text-primary mb-2" data-testid={`text-voucher-valor-${voucher.id}`}>
              R$ {voucher.valor.toFixed(2)}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>
                Válido até {format(new Date(voucher.validade), "dd/MM/yyyy", { locale: ptBR })}
              </span>
            </div>
            {isExpiringSoon() && (
              <Badge variant="secondary" className="text-xs">
                Expira em breve
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mt-2" data-testid={`text-voucher-codigo-${voucher.id}`}>
            Código: {voucher.codigo}
          </p>
        </div>
      </div>
    </Card>
  );
}
