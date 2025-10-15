import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

// Aqui definimos que o componente espera receber as duas funções
interface QRScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanFailure?: (error: string) => void;
}

const QRScanner = ({ onScanSuccess, onScanFailure }: QRScannerProps) => {
  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader", // O ID do <div> onde o scanner vai aparecer
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true,
        supportedScanTypes: [],
      },
      false // verbose
    );

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    // Função de limpeza para parar o scanner
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Falha ao limpar o Html5QrcodeScanner.", error);
      });
    };
  }, [onScanSuccess, onScanFailure]);

  return <div id="reader" className="w-full max-w-sm" />;
};

export default QRScanner;
