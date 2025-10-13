import VoucherQRModal from '../VoucherQRModal'

export default function VoucherQRModalExample() {
  const voucher = {
    id: "v1",
    codigo: "SERR20-0001",
    tipo: "Desconto Loja",
    valor: 20,
    status: "ativo" as const,
    validade: "2025-11-01"
  };

  return (
    <VoucherQRModal
      voucher={voucher}
      onClose={() => console.log('Modal closed')}
    />
  )
}
