import QRScanner from '../QRScanner'

export default function QRScannerExample() {
  return (
    <QRScanner
      onScan={(chave) => console.log('Scanned:', chave)}
      onClose={() => console.log('Scanner closed')}
    />
  )
}
