import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import QRScanner from "@/components/QRScanner";
import { useAppData } from "@/lib/fake-data";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type ValidationState = "idle" | "success" | "error" | "duplicate";

export default function RegistrarAbastecimento() {
  const [, setLocation] = useLocation();
  const { postos, abastecimentos, addAbastecimento, user, setUser, addNotification } = useAppData();
  const { toast } = useToast();
  const [showScanner, setShowScanner] = useState(false);
  const [validationState, setValidationState] = useState<ValidationState>("idle");
  const [parsedData, setParsedData] = useState<any>(null);

  const handleScan = (chave: string) => {
    setShowScanner(false);

    // Check if nota already registered
    const isDuplicate = abastecimentos.some(a => a.chave === chave);
    if (isDuplicate) {
      setValidationState("duplicate");
      setParsedData({ chave });
      return;
    }

    // Simulate parsing nota fiscal data
    const randomPosto = postos[Math.floor(Math.random() * postos.length)];
    const litros = Math.floor(Math.random() * 30) + 20;
    const valor = litros * 5.5;

    const data = {
      chave,
      posto: randomPosto,
      litros,
      valor,
      data: new Date().toISOString(),
    };

    setParsedData(data);
    
    // Simulate validation - 90% success rate
    if (Math.random() > 0.1) {
      setValidationState("success");
    } else {
      setValidationState("error");
    }
  };

  const handleConfirm = () => {
    if (!parsedData) return;

    const newAbastecimento = {
      id: `a${Date.now()}`,
      chave: parsedData.chave,
      posto_cnpj: parsedData.posto.cnpj,
      litros: parsedData.litros,
      valor: parsedData.valor,
      data: parsedData.data,
      status: "registrado" as const,
    };

    addAbastecimento(newAbastecimento);
    
    // Update user points and liters
    const pontosGanhos = Math.floor(parsedData.litros * 5);
    setUser({
      ...user,
      pontos: user.pontos + pontosGanhos,
      litros_acumulados: user.litros_acumulados + parsedData.litros,
    });

    // Add notification
    addNotification({
      id: `n${Date.now()}`,
      tipo: "abastecimento_registrado",
      titulo: "Abastecimento Registrado",
      mensagem: `Seu abastecimento de ${parsedData.litros} litros foi registrado. Você ganhou ${pontosGanhos} pontos!`,
      data: new Date().toISOString(),
      lida: false,
    });

    toast({
      title: "Sucesso!",
      description: `Abastecimento registrado! +${pontosGanhos} pontos`,
    });

    setTimeout(() => setLocation("/abastecimentos"), 800);
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
          <h2 className="text-2xl font-bold">Registrar Abastecimento</h2>
        </div>

        {!parsedData ? (
          <Card className="p-8 text-center space-y-4">
            <p className="text-muted-foreground">
              Escaneie o QR Code da NFC-e ou insira a chave manualmente
            </p>
            <Button
              onClick={() => setShowScanner(true)}
              size="lg"
              className="w-full"
              data-testid="button-open-scanner"
            >
              Escanear NFC-e
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {validationState === "success" && (
              <Card className="p-4 border-l-4 border-l-chart-5 bg-chart-5/5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-chart-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-chart-5 mb-1">Nota Válida!</h4>
                    <p className="text-sm text-muted-foreground">
                      Posto participante confirmado
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {validationState === "error" && (
              <Card className="p-4 border-l-4 border-l-destructive bg-destructive/5">
                <div className="flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-destructive mb-1">Nota Inválida</h4>
                    <p className="text-sm text-muted-foreground">
                      Não foi possível validar esta nota fiscal
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {validationState === "duplicate" && (
              <Card className="p-4 border-l-4 border-l-chart-2 bg-chart-2/5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-chart-2 mb-1">Nota Já Registrada</h4>
                    <p className="text-sm text-muted-foreground">
                      Esta nota fiscal já foi cadastrada anteriormente
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {validationState === "success" && (
              <Card className="p-4 space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">Dados do Abastecimento</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Posto:</span>
                      <span className="font-medium" data-testid="text-parsed-posto">
                        {parsedData.posto.nome}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CNPJ:</span>
                      <span className="font-mono text-xs">{parsedData.posto.cnpj}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Litros:</span>
                      <span className="font-semibold" data-testid="text-parsed-litros">
                        {parsedData.litros}L
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valor:</span>
                      <span className="font-semibold" data-testid="text-parsed-valor">
                        R$ {parsedData.valor.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data/Hora:</span>
                      <span className="text-xs">
                        {format(new Date(parsedData.data), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Pontos a ganhar:</span>
                    <Badge variant="default" className="text-base" data-testid="badge-points-to-earn">
                      +{Math.floor(parsedData.litros * 5)} pontos
                    </Badge>
                  </div>
                </div>

                <Button
                  onClick={handleConfirm}
                  className="w-full"
                  data-testid="button-confirm-registro"
                >
                  Confirmar Registro
                </Button>
              </Card>
            )}

            <Button
              variant="outline"
              onClick={() => {
                setParsedData(null);
                setValidationState("idle");
              }}
              className="w-full"
              data-testid="button-scan-again"
            >
              Escanear Outra Nota
            </Button>
          </div>
        )}
      </main>

      {showScanner && (
        <QRScanner onScan={handleScan} onClose={() => setShowScanner(false)} />
      )}

      <BottomNav />
    </div>
  );
}
