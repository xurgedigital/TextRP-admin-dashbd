import InboxComp from '@/components/Inbox'
import ChatSection from '@/components/ChatSection'
import { useContext, useEffect, useState } from 'react'
import PersonalChat from '@/components/PersonalChat'
import useWidth from '@/hooks/useWidth'
import { Context } from './_app'
import { useRouter } from 'next/router'

export default function Home() {
  const [ChatSelected, setChatSelected] = useState(null)
  const { state, dispatch }: any = useContext(Context)
  const width = useWidth()
  const router = useRouter()

  useEffect(() => {
    if (!(state.user.isLoggedIn || localStorage.getItem('isLoggedIn') == 'true')) {
      router.push('/login')
    }
  })

  return (
    <div className="flex max-h-screen">
      <InboxComp ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
      {width >= 768 && (
        <ChatSection ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
      )}
      <div className=" overflow-hidden">
        {width < 768 && ChatSelected !== null && (
          <ChatSection ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
        )}
      </div>
    </div>
  )
}
