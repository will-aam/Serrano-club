import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  litrosAcumulados: number;
  metaLitros?: number;
}

export default function ProgressBar({ litrosAcumulados, metaLitros = 100 }: ProgressBarProps) {
  const percentage = Math.min((litrosAcumulados / metaLitros) * 100, 100);
  const litrosRestantes = Math.max(metaLitros - litrosAcumulados, 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {litrosAcumulados}/{metaLitros} litros
        </span>
        <span className="text-muted-foreground">
          {litrosRestantes > 0 ? `${litrosRestantes}L para próxima recompensa` : "Meta atingida!"}
        </span>
      </div>
      <Progress value={percentage} className="h-2" data-testid="progress-liters" />
    </div>
  );
}
