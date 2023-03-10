import DummyChatSection from '@/components/DummyChatSection'
import Profile from '@/components/Profile'
import Settings from '@/components/Settings'

export default function SettingPage() {
  return (
    <div className="flex max-h-screen overflow-x-hidden">
      <Profile />
      <DummyChatSection />
    </div>
  )
}
