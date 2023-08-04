import InboxComp from '@/components/Inbox'
import ChatSection from '@/components/ChatSection'
import { useContext, useEffect, useState } from 'react'
import useWidth from '@/hooks/useWidth'
import useSWR from 'swr'
import { Context } from '@/pages/_app'
import { useTwilio } from 'twilio-conversations-hooks'
import { Conversation } from '@twilio/conversations/lib'
import DummyChatSection from '@/components/DummyChatSection'
import Settings from '@/components/Settings'
import AdminPage from '@/pages/admin'

// export default function Home() {
//   const [ChatSelected, setChatSelected] = useState<Conversation | undefined>(undefined)
//   const width = useWidth()
//   const { state, dispatch }: any = useContext(Context)
//   const { data, isLoading } = useSWR('/api/user/twilio/token', {
//     refreshInterval: 3000000,
//     refreshWhenHidden: true,
//     shouldRetryOnError: true,
//     refreshWhenOffline: false,
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//   })
//   const token = data?.jwt
//   const { connect, conversations } = useTwilio()

//   useEffect(() => {
//     if (token) {
//       connect(token).then(() => console.log('Connected to Twilio'))
//     }
//   }, [token])

//   useEffect(() => {
//     if (!ChatSelected) {
//       setChatSelected(conversations[0])
//     }
//   }, [conversations])
//   return (
//     <div className="flex max-h-screen">
//       <InboxComp ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
//       {width >= 768 && (
//         <ChatSection ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
//       )}
//       <div className=" overflow-hidden mobile">
//         {width < 768 && ChatSelected !== undefined && (
//           <ChatSection ChatSelected={ChatSelected} setChatSelected={setChatSelected} />
//         )}
//       </div>
//     </div>
//   )
// }

export default function Home() {
  return (
    <div className="flex max-h-screen">
      <AdminPage />
    </div>
  )
}
