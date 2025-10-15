import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import QRScanner from "@/components/QRScanner";
import { useAppData } from "@/lib/fake-data";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type ValidationState = "idle" | "loading" | "success" | "error" | "duplicate";

// Tipagem para os dados que esperamos da API da FocusNFe
type NotaFiscalAPIResponse = {
  chave_nfe: string;
  nome_emitente: string;
  cnpj_emitente: string;
  data_emissao: string;
  valor_total: string;
  // A API retorna muito mais, mas vamos usar só esses por enquanto
};

export default function RegistrarAbastecimento() {
  const [, setLocation] = useLocation();
  const { abastecimentos, addAbastecimento, user, setUser, addNotification } =
    useAppData();
  const { toast } = useToast();
  const [showScanner, setShowScanner] = useState(false);
  const [validationState, setValidationState] =
    useState<ValidationState>("idle");
  const [parsedData, setParsedData] = useState<NotaFiscalAPIResponse | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [manualChave, setManualChave] = useState("");

  const processarChave = async (chave: string) => {
    // Esconde o scanner se estiver aberto
    setShowScanner(false);
    // Limpa o input manual
    setManualChave("");
    // Inicia o estado de carregamento
    setValidationState("loading");
    setErrorMessage("");

    // 1. Checa se a nota já foi registrada (usando nossos dados 'fake' por enquanto)
    const isDuplicate = abastecimentos.some((a) => a.chave === chave);
    if (isDuplicate) {
      setValidationState("duplicate");
      return;
    }

    // 2. Chama a nossa API no backend para consultar a chave
    try {
      const response = await fetch(`/api/nfce/${chave}`);
      const data = await response.json();

      if (!response.ok) {
        // Se a API retornar um erro, usamos a mensagem dela
        throw new Error(data.mensagem || `Erro ${response.status}`);
      }

      // Sucesso! Guarda os dados e muda o estado
      setParsedData(data);
      setValidationState("success");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || "Não foi possível validar esta nota fiscal."
      );
      setValidationState("error");
    }
  };

  const handleConfirm = () => {
    if (!parsedData) return;

    // Simula a extração de litros do valor total (ex: R$ 5,50 por litro)
    const valorNumerico = parseFloat(parsedData.valor_total);
    const litrosSimulados = valorNumerico / 5.5;
    const pontosGanhos = Math.floor(litrosSimulados * 5);

    const newAbastecimento = {
      id: `a${Date.now()}`,
      chave: parsedData.chave_nfe,
      posto_cnpj: parsedData.cnpj_emitente,
      litros: litrosSimulados,
      valor: valorNumerico,
      data: new Date(parsedData.data_emissao).toISOString(),
      status: "registrado" as const,
    };

    addAbastecimento(newAbastecimento);

    setUser({
      ...user,
      pontos: user.pontos + pontosGanhos,
      litros_acumulados: user.litros_acumulados + litrosSimulados,
    });

    addNotification({
      id: `n${Date.now()}`,
      tipo: "abastecimento_registrado",
      titulo: "Abastecimento Registrado",
      mensagem: `Seu abastecimento de ${litrosSimulados.toFixed(
        2
      )}L foi registrado. Você ganhou ${pontosGanhos} pontos!`,
      data: new Date().toISOString(),
      lida: false,
    });

    toast({
      title: "Sucesso!",
      description: `Abastecimento registrado! +${pontosGanhos} pontos`,
    });

    setTimeout(() => setLocation("/abastecimentos"), 800);
  };

  // Extrai a chave da URL completa do QR Code e chama a função principal
  const handleScanSuccess = (decodedText: string) => {
    const chaveRegex = /\?p=([^|]+)/;
    const match = decodedText.match(chaveRegex);
    const chaveAcesso = match ? match[1] : null;

    if (chaveAcesso && chaveAcesso.length >= 44) {
      processarChave(chaveAcesso);
    } else {
      setErrorMessage("QR Code inválido. Tente a digitação manual.");
      setValidationState("error");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl font-bold">Registrar Abastecimento</h2>
        </div>

        {!parsedData && validationState !== "loading" ? (
          <Card className="p-6 text-center space-y-4">
            <p className="text-muted-foreground">
              Aponte para o QR Code da NFC-e ou insira a chave de 44 dígitos
            </p>
            <Button
              onClick={() => setShowScanner(true)}
              size="lg"
              className="w-full"
            >
              Escanear QR Code
            </Button>
            <div className="flex items-center gap-2 pt-2">
              <Input
                placeholder="Digite a chave de acesso"
                value={manualChave}
                onChange={(e) => setManualChave(e.target.value)}
                className="flex-grow"
              />
              <Button
                onClick={() => processarChave(manualChave)}
                disabled={manualChave.length < 44}
              >
                OK
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {validationState === "loading" && (
              <Card className="p-6 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">
                  Consultando nota fiscal...
                </p>
              </Card>
            )}

            {validationState === "success" && parsedData && (
              <>
                <Card className="p-4 border-l-4 border-l-chart-5 bg-chart-5/5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-chart-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-chart-5 mb-1">
                        Nota Válida!
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Dados recebidos com sucesso.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">
                      Dados do Abastecimento
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Posto:</span>
                        <span className="font-medium text-right">
                          {parsedData.nome_emitente}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CNPJ:</span>
                        <span className="font-mono text-xs">
                          {parsedData.cnpj_emitente}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Valor:</span>
                        <span className="font-semibold">
                          R$ {parsedData.valor_total}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Data/Hora:
                        </span>
                        <span className="text-xs">
                          {format(
                            new Date(parsedData.data_emissao),
                            "dd/MM/yyyy 'às' HH:mm",
                            { locale: ptBR }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleConfirm} className="w-full">
                    Confirmar Registro
                  </Button>
                </Card>
              </>
            )}

            {(validationState === "error" ||
              validationState === "duplicate") && (
              <Card
                className={`p-4 border-l-4 ${
                  validationState === "error"
                    ? "border-l-destructive bg-destructive/5"
                    : "border-l-chart-2 bg-chart-2/5"
                }`}
              >
                <div className="flex items-start gap-3">
                  {validationState === "error" ? (
                    <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-chart-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4
                      className={`font-semibold mb-1 ${
                        validationState === "error"
                          ? "text-destructive"
                          : "text-chart-2"
                      }`}
                    >
                      {validationState === "error"
                        ? "Nota Inválida"
                        : "Nota Já Registrada"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {validationState === "error"
                        ? errorMessage
                        : "Esta nota fiscal já foi utilizada."}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {validationState !== "loading" && (
              <Button
                variant="outline"
                onClick={() => {
                  setParsedData(null);
                  setValidationState("idle");
                }}
                className="w-full"
              >
                Escanear ou Digitar Outra Nota
              </Button>
            )}
          </div>
        )}
      </main>

      {showScanner && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg overflow-hidden w-full max-w-md">
            <QRScanner
              onScanSuccess={handleScanSuccess}
              onScanFailure={() => {}}
            />
            <Button
              variant="ghost"
              onClick={() => setShowScanner(false)}
              className="w-full mt-2"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
