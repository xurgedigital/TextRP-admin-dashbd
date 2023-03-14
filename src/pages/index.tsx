import InboxComp from '@/components/Inbox'
import ChatSection from '@/components/ChatSection'
import { useState } from 'react'
import useWidth from '@/hooks/useWidth'

export default function Home() {
  const [ChatSelected, setChatSelected] = useState(null)
  const width = useWidth()
  return (
    <div className="flex max-h-screen">
      <InboxComp ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
      {width >= 768 && (
        <ChatSection ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
      )}
      {/* <div className=" overflow-hidden">
        {width < 768 && ChatSelected !== null && (
          <ChatSection ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
        )}
      </div> */}
    </div>
  )
}
