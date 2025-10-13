import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Check, Fuel } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Notification } from "@shared/schema";

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

export default function NotificationItem({ notification, onClick }: NotificationItemProps) {
  const iconMap = {
    voucher_gerado: Gift,
    voucher_usado: Check,
    abastecimento_registrado: Fuel,
  };

  const Icon = iconMap[notification.tipo];

  return (
    <Card
      className={`p-4 hover-elevate active-elevate-2 cursor-pointer ${!notification.lida ? "border-l-4 border-l-primary" : ""}`}
      onClick={onClick}
      data-testid={`notification-${notification.id}`}
    >
      <div className="flex items-start gap-3">
        <div className="bg-accent p-2 rounded-lg">
          <Icon className="w-5 h-5 text-accent-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm" data-testid={`text-notification-titulo-${notification.id}`}>
              {notification.titulo}
            </h4>
            {!notification.lida && (
              <Badge variant="default" className="text-xs">
                Novo
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2" data-testid={`text-notification-mensagem-${notification.id}`}>
            {notification.mensagem}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(notification.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
      </div>
    </Card>
  );
}
