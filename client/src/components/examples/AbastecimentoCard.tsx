import AbastecimentoCard from '../AbastecimentoCard'

export default function AbastecimentoCardExample() {
  const abastecimento = {
    id: "a1",
    chave: "35241000000000000000000000000000000000001",
    posto_cnpj: "01234567000189",
    litros: 40,
    valor: 200,
    data: "2025-10-01T09:12:00",
    status: "registrado" as const
  };

  return (
    <AbastecimentoCard
      abastecimento={abastecimento}
      postoNome="Posto Serrano Shell"
      onClick={() => console.log('Clicked')}
    />
  )
}
