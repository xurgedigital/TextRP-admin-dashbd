import BuyCredits from '@/components/BuyCredits'
import DummyChatSection from '@/components/DummyChatSection'
import NFTSection from '@/components/NFT'

export default function SettingPage() {
  return (
    <div className="flex max-h-screen overflow-x-hidden">
      <NFTSection />
      <DummyChatSection />
    </div>
  )
}
