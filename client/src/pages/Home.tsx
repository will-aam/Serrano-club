import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { QrCode, Clock, Gift } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import PointsCard from "@/components/PointsCard";
import ProgressBar from "@/components/ProgressBar";
import { useAppData } from "@/lib/fake-data";

export default function Home() {
  const { user, vouchers } = useAppData();
  const vouchersAtivos = vouchers.filter(v => v.status === "ativo").length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />
      
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold" data-testid="text-greeting">
            Olá, {user.nome}!
          </h2>
          <p className="text-muted-foreground">
            Bem-vindo ao seu programa de fidelidade
          </p>
        </div>

        <PointsCard pontos={user.pontos} vouchersAtivos={vouchersAtivos} />

        <ProgressBar litrosAcumulados={user.litros_acumulados} metaLitros={100} />

        <div className="space-y-3">
          <Link href="/registrar">
            <Button className="w-full h-14 text-base" data-testid="button-registrar">
              <QrCode className="w-5 h-5 mr-2" />
              Registrar Abastecimento
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/abastecimentos">
              <Button variant="secondary" className="w-full h-12" data-testid="button-historico">
                <Clock className="w-4 h-4 mr-2" />
                Meus Abastecimentos
              </Button>
            </Link>

            <Link href="/resgatar">
              <Button variant="secondary" className="w-full h-12" data-testid="button-resgatar">
                <Gift className="w-4 h-4 mr-2" />
                Resgatar Descontos
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
