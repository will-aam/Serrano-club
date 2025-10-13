import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import NotificationItem from "@/components/NotificationItem";
import { useAppData } from "@/lib/fake-data";

export default function Notificacoes() {
  const [, setLocation] = useLocation();
  const { notifications, setNotifications } = useAppData();

  const handleNotificationClick = (id: string) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, lida: true } : n)
    );
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
          <h2 className="text-2xl font-bold">Notificações</h2>
        </div>

        {notifications.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              Nenhuma notificação no momento
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => handleNotificationClick(notification.id)}
              />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
