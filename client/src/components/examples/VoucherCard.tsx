import VoucherCard from '../VoucherCard'

export default function VoucherCardExample() {
  const voucher = {
    id: "v1",
    codigo: "SERR20-0001",
    tipo: "Desconto Loja",
    valor: 20,
    status: "ativo" as const,
    validade: "2025-11-01"
  };

  return (
    <VoucherCard
      voucher={voucher}
      onClick={() => console.log('Voucher clicked')}
    />
  )
}
