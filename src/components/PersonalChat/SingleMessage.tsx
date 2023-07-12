import { Message } from '@twilio/conversations/lib'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

const renderMessageBody = (body: string, mediaUrl?: string, contentType?: string) => {
  return (
    <>
      {contentType?.includes('image') && (
        <img src={mediaUrl} className="object-contain w-full w-50" alt={''}></img>
      )}
      {contentType?.includes('audio') && (
        <audio src={mediaUrl} controls={true} className="object-contain w-full"></audio>
      )}
      <p className="whitespace-pre-wrap">{body}</p>
    </>
  )
}
export const SingleMessage = ({ message: msg, isMe }: { message: Message; isMe: boolean }) => {
  const [mediaUrl, setMediaUrl] = useState('')
  useEffect(() => {
    if (!!msg?.media?.contentType) {
      msg?.media?.getContentTemporaryUrl().then((u) => setMediaUrl(u))
    }
  }, [msg.sid])
  return (
    <div
      key={msg.sid}
      className={`p-4 max-w-[60%] ${
        isMe
          ? 'self-end rounded-br-none text-white bg-primary-blue'
          : 'self-start rounded-bl-none  bg-gray-bg dark:bg-gray-bg-dark'
      } my-2 rounded-lg ${msg?.media?.contentType ? 'min-w-[90%] md:min-w-[60%]' : ''}`}
    >
      {renderMessageBody(msg.body, mediaUrl, msg?.media?.contentType)}
      <div
        className={`font-normal text-xs ${
          isMe ? 'text-gray-bg2' : 'text-secondary-text dark:text-secondary-text-dark'
        } flex w-full justify-end`}
      >
        {moment(msg?.dateCreated).format('H:M A')}
      </div>
    </div>
  )
}
