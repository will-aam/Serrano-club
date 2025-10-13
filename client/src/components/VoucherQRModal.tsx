import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Voucher } from "@shared/schema";

interface VoucherQRModalProps {
  voucher: Voucher;
  onClose: () => void;
}

export default function VoucherQRModal({ voucher, onClose }: VoucherQRModalProps) {
  const isUsado = voucher.status === "usado";

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4"
          data-testid="button-close-voucher"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold" data-testid="text-voucher-modal-tipo">
            {voucher.tipo}
          </h3>
          {voucher.valor > 0 && (
            <p className="text-3xl font-bold text-primary">
              R$ {voucher.valor.toFixed(2)}
            </p>
          )}
        </div>

        <div className="relative bg-white p-6 rounded-lg flex items-center justify-center">
          <QRCodeSVG value={voucher.codigo} size={200} data-testid="qr-code" />
          {isUsado && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <div className="bg-destructive text-destructive-foreground px-6 py-3 rounded-lg transform -rotate-12 flex items-center gap-2">
                <Check className="w-6 h-6" />
                <span className="text-xl font-bold">USADO</span>
              </div>
            </div>
          )}
        </div>

        <div className="text-center space-y-2">
          <p className="text-lg font-mono font-semibold" data-testid="text-voucher-codigo">
            {voucher.codigo}
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant={isUsado ? "secondary" : "default"} data-testid="badge-voucher-status">
              {isUsado ? "Usado" : "Ativo"}
            </Badge>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-1 text-center">
          <p>
            Válido até: {format(new Date(voucher.validade), "dd/MM/yyyy", { locale: ptBR })}
          </p>
          {isUsado && voucher.data_validacao && (
            <p>
              Usado em: {format(new Date(voucher.data_validacao), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </p>
          )}
          {isUsado && voucher.funcionario && (
            <p>Validado por: {voucher.funcionario}</p>
          )}
          <p className="mt-2 text-xs">Uso único por cliente</p>
        </div>
      </Card>
    </div>
  );
}
