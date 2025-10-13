import NotificationItem from '../NotificationItem'

export default function NotificationItemExample() {
  const notification = {
    id: "n1",
    tipo: "voucher_gerado" as const,
    titulo: "Voucher Gerado",
    mensagem: "Você ganhou um voucher de R$ 20,00 na loja!",
    data: "2025-10-10T14:30:00",
    lida: false
  };

  return (
    <NotificationItem
      notification={notification}
      onClick={() => console.log('Notification clicked')}
    />
  )
}
