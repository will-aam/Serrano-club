import RewardCard from '../RewardCard'

export default function RewardCardExample() {
  const reward = {
    id: "r1",
    titulo: "Voucher R$ 20",
    descricao: "Desconto de R$ 20 para usar na loja",
    tipo: "Desconto Loja",
    valor: 20,
    litros_necessarios: 50,
    pontos_necessarios: 300
  };

  return (
    <RewardCard
      reward={reward}
      userLitros={78}
      userPontos={420}
      onRedeem={() => console.log('Redeem clicked')}
    />
  )
}
