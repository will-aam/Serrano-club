import TopBar from '../TopBar'
import { AppProvider } from '@/lib/fake-data'

export default function TopBarExample() {
  return (
    <AppProvider>
      <TopBar />
    </AppProvider>
  )
}
