import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Calendar, Fuel, DollarSign, FileText } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import AbastecimentoCard from "@/components/AbastecimentoCard";
import { useAppData } from "@/lib/fake-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Abastecimento } from "@shared/schema";

export default function MeusAbastecimentos() {
  const [, setLocation] = useLocation();
  const { abastecimentos, postos } = useAppData();
  const [selectedAbastecimento, setSelectedAbastecimento] = useState<Abastecimento | null>(null);

  const getPostoNome = (cnpj: string) => {
    return postos.find(p => p.cnpj === cnpj)?.nome || "Posto Desconhecido";
  };

  const getPostoEndereco = (cnpj: string) => {
    return postos.find(p => p.cnpj === cnpj)?.endereco || "";
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
          <h2 className="text-2xl font-bold">Meus Abastecimentos</h2>
        </div>

        {abastecimentos.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              Nenhum abastecimento registrado ainda
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {abastecimentos.map((abastecimento) => (
              <AbastecimentoCard
                key={abastecimento.id}
                abastecimento={abastecimento}
                postoNome={getPostoNome(abastecimento.posto_cnpj)}
                onClick={() => setSelectedAbastecimento(abastecimento)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedAbastecimento && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Detalhes do Abastecimento</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedAbastecimento(null)}
                data-testid="button-close-details"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-accent p-3 rounded-lg">
                  <Building2 className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{getPostoNome(selectedAbastecimento.posto_cnpj)}</h4>
                  <p className="text-sm text-muted-foreground">
                    {getPostoEndereco(selectedAbastecimento.posto_cnpj)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    CNPJ: {selectedAbastecimento.posto_cnpj}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Fuel className="w-4 h-4" />
                    <span>Litros</span>
                  </div>
                  <p className="text-2xl font-bold">{selectedAbastecimento.litros}L</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <DollarSign className="w-4 h-4" />
                    <span>Valor</span>
                  </div>
                  <p className="text-2xl font-bold">R$ {selectedAbastecimento.valor.toFixed(2)}</p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Data e Hora</span>
                </div>
                <p className="font-medium">
                  {format(new Date(selectedAbastecimento.data), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <FileText className="w-4 h-4" />
                  <span>Chave de Acesso</span>
                </div>
                <p className="font-mono text-xs break-all bg-muted p-2 rounded">
                  {selectedAbastecimento.chave}
                </p>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Cupom Fiscal Eletrônico</p>
                <div className="bg-white p-4 rounded border-2 border-dashed border-muted-foreground/20">
                  <p className="text-xs text-muted-foreground">
                    [Imagem simulada do cupom fiscal]
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
