import { Bell } from "lucide-react";
import { Link } from "wouter";
import { useAppData } from "@/lib/fake-data";
import { Badge } from "@/components/ui/badge";

export default function TopBar() {
  const { notifications } = useAppData();
  const unreadCount = notifications.filter(n => !n.lida).length;

  return (
    <header className="sticky top-0 bg-card border-b border-card-border z-40">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary" data-testid="text-app-title">
          Serrano Club
        </h1>
        <Link href="/notificacoes">
          <button
            className="relative p-2 hover-elevate active-elevate-2 rounded-md"
            data-testid="button-notifications"
          >
            <Bell className="w-6 h-6 text-foreground" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 min-w-5 px-1 flex items-center justify-center text-xs"
                data-testid="badge-unread-count"
              >
                {unreadCount}
              </Badge>
            )}
          </button>
        </Link>
      </div>
    </header>
  );
}
