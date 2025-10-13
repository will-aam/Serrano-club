import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Scan } from "lucide-react";

interface QRScannerProps {
  onScan: (chave: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [manualInput, setManualInput] = useState("");

  const handleSimulateScan = () => {
    // Simulate scanning a QR code
    const simulatedChave = "35241000000000000000000000000000000000003";
    onScan(simulatedChave);
  };

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      onScan(manualInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Escanear NFC-e</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-testid="button-close-scanner"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Simulated scanner viewfinder */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <div className="absolute inset-4 border-2 border-primary rounded-lg">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />
            </div>
            <Scan className="w-16 h-16 text-primary opacity-50" />
          </div>

          <Button
            onClick={handleSimulateScan}
            className="w-full"
            data-testid="button-simulate-scan"
          >
            <Scan className="w-4 h-4 mr-2" />
            Simular Escaneamento
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="chave">Chave de Acesso NFC-e</Label>
            <Input
              id="chave"
              placeholder="Digite a chave da nota fiscal"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              data-testid="input-manual-key"
            />
          </div>

          <Button
            onClick={handleManualSubmit}
            variant="secondary"
            className="w-full"
            disabled={!manualInput.trim()}
            data-testid="button-manual-submit"
          >
            Confirmar Chave Manual
          </Button>
        </div>
      </Card>
    </div>
  );
}
