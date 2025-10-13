import { Home, QrCode, Clock, Gift, User } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/registrar", icon: QrCode, label: "Registrar" },
    { path: "/abastecimentos", icon: Clock, label: "Histórico" },
    { path: "/resgatar", icon: Gift, label: "Resgatar" },
    { path: "/perfil", icon: User, label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <button className="flex flex-col items-center justify-center gap-1 px-3 py-2 hover-elevate active-elevate-2 rounded-md">
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-xs ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}
                >
                  {item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
