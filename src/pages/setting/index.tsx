import Settings from '@/components/Settings'
import DummyChatSection from '@/components/DummyChatSection'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Context } from '../_app'

export default function SettingPage() {
  const router = useRouter()
  const { state, dispatch }: any = useContext(Context)

  useEffect(() => {
    if (!(state.user.isLoggedIn || localStorage.getItem('isLoggedIn') == 'true')) {
      router.push('/login')
    }
  })

  return (
    <div className="flex max-h-screen">
      <Settings />
      <DummyChatSection />
    </div>
  )
}
