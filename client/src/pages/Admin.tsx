import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Scan, CheckCircle, XCircle, Filter } from "lucide-react";
import { useAppData } from "@/lib/fake-data";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Voucher } from "@shared/schema";

export default function Admin() {
  const { vouchers, updateVoucher, formasPagamento, addNotification } = useAppData();
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [scanInput, setScanInput] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [auditLog, setAuditLog] = useState<Array<{
    id: string;
    voucher: string;
    acao: string;
    funcionario: string;
    data: string;
  }>>([]);

  const filteredVouchers = vouchers.filter(v => {
    if (filterStatus === "todos") return true;
    return v.status === filterStatus;
  });

  const handleScan = () => {
    const voucher = vouchers.find(v => v.codigo === scanInput.trim());
    
    if (!voucher) {
      toast({
        title: "Voucher Inválido",
        description: "Código não encontrado no sistema",
        variant: "destructive",
      });
      return;
    }

    setSelectedVoucher(voucher);
    setScanInput("");
  };

  const handleValidate = () => {
    if (!selectedVoucher || !formaPagamento) {
      toast({
        title: "Erro",
        description: "Selecione uma forma de pagamento",
        variant: "destructive",
      });
      return;
    }

    if (selectedVoucher.status === "usado") {
      toast({
        title: "Voucher Já Usado",
        description: `Este voucher foi usado em ${selectedVoucher.data_validacao}`,
        variant: "destructive",
      });
      return;
    }

    if (selectedVoucher.status === "expirado") {
      toast({
        title: "Voucher Expirado",
        description: "Este voucher não é mais válido",
        variant: "destructive",
      });
      return;
    }

    // Validate voucher
    const funcionario = "Admin"; // In real app, would be logged-in user
    updateVoucher(selectedVoucher.id, {
      status: "usado",
      data_validacao: new Date().toISOString(),
      funcionario,
    });

    // Add to audit log
    setAuditLog([
      {
        id: `log${Date.now()}`,
        voucher: selectedVoucher.codigo,
        acao: "Validado",
        funcionario,
        data: new Date().toISOString(),
      },
      ...auditLog,
    ]);

    // Add notification
    addNotification({
      id: `n${Date.now()}`,
      tipo: "voucher_usado",
      titulo: "Voucher Usado",
      mensagem: `Seu voucher ${selectedVoucher.tipo} foi utilizado`,
      data: new Date().toISOString(),
      lida: false,
    });

    toast({
      title: "Voucher Validado!",
      description: `${selectedVoucher.tipo} foi marcado como usado`,
    });

    setSelectedVoucher(null);
    setFormaPagamento("");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-admin-title">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">
            Validação de vouchers do Serrano Club
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Scanner Section */}
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Validar Voucher</h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scan">Código do Voucher</Label>
                  <div className="flex gap-2">
                    <Input
                      id="scan"
                      placeholder="Escanear ou digitar código"
                      value={scanInput}
                      onChange={(e) => setScanInput(e.target.value)}
                      data-testid="input-scan-code"
                    />
                    <Button
                      onClick={handleScan}
                      size="icon"
                      data-testid="button-scan"
                    >
                      <Scan className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {selectedVoucher && (
                  <div className="space-y-4 p-4 bg-muted rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold" data-testid="text-selected-voucher-tipo">
                          {selectedVoucher.tipo}
                        </h3>
                        {selectedVoucher.valor > 0 && (
                          <p className="text-2xl font-bold text-primary">
                            R$ {selectedVoucher.valor.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant={
                          selectedVoucher.status === "ativo"
                            ? "default"
                            : selectedVoucher.status === "usado"
                            ? "secondary"
                            : "destructive"
                        }
                        data-testid="badge-selected-voucher-status"
                      >
                        {selectedVoucher.status}
                      </Badge>
                    </div>

                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-muted-foreground">Código:</span>{" "}
                        <span className="font-mono">{selectedVoucher.codigo}</span>
                      </p>
                      <p>
                        <span className="text-muted-foreground">Validade:</span>{" "}
                        {format(new Date(selectedVoucher.validade), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                    </div>

                    {selectedVoucher.status === "ativo" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="pagamento">Forma de Pagamento</Label>
                          <Select value={formaPagamento} onValueChange={setFormaPagamento}>
                            <SelectTrigger id="pagamento" data-testid="select-payment">
                              <SelectValue placeholder="Selecione..." />
                            </SelectTrigger>
                            <SelectContent>
                              {formasPagamento.map((forma) => (
                                <SelectItem key={forma} value={forma}>
                                  {forma}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          onClick={handleValidate}
                          className="w-full"
                          disabled={!formaPagamento}
                          data-testid="button-validate"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Validar Voucher
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Voucher List */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Lista de Vouchers</h2>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40" data-testid="select-filter">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="ativo">Ativos</SelectItem>
                  <SelectItem value="usado">Usados</SelectItem>
                  <SelectItem value="expirado">Expirados</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredVouchers.map((voucher) => (
                <div
                  key={voucher.id}
                  className="p-3 bg-muted rounded-lg flex items-center justify-between hover-elevate cursor-pointer"
                  onClick={() => setSelectedVoucher(voucher)}
                  data-testid={`voucher-item-${voucher.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{voucher.tipo}</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      {voucher.codigo}
                    </p>
                  </div>
                  <Badge
                    variant={
                      voucher.status === "ativo"
                        ? "default"
                        : voucher.status === "usado"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {voucher.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Audit Log */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Registro de Auditoria</h2>
          <div className="space-y-2">
            {auditLog.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma validação registrada ainda
              </p>
            ) : (
              auditLog.map((log) => (
                <div
                  key={log.id}
                  className="p-3 bg-muted rounded-lg flex items-center justify-between"
                  data-testid={`audit-log-${log.id}`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-chart-5" />
                    <div>
                      <p className="font-semibold">Voucher {log.voucher}</p>
                      <p className="text-sm text-muted-foreground">
                        Validado por {log.funcionario}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(log.data), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
