import Image, { StaticImageData } from 'next/image'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import _ from 'lodash'
import ThreeDotedIcon from '@public/Icons/threedotedIcon.svg'
import LeftArrorwIcon from '@public/Icons/leftArrowIcon.svg'
import SearchIcon from '@public/Icons/searchIcon.svg'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { ImMic } from 'react-icons/im'
import { IoClose, IoSendSharp } from 'react-icons/io5'
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder'
import { FaStop } from 'react-icons/fa'
import AboutUser from './AboutUser'
import { Conversation } from '@twilio/conversations/lib'
import { useConversation, useTwilio } from 'twilio-conversations-hooks'
import { Context } from '@/pages/_app'
import { SingleMessage } from '@components/PersonalChat/SingleMessage'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import walletnametrimmer from '@/helpers/walletnametrimmer'

export interface IChatData {
  userImage: string | any
  platformIcon: StaticImageData
  userName: string
  lastChat: string
  time: string
  unseenMessageCount: number
  handleSelectChat: Function
}
interface IPersonalProps {
  ChatSelected?: Conversation
  setChatSelected: Function
}

const PersonalChat = (props: IPersonalProps) => {
  const [InputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [recording, setRecording] = useState<Blob | undefined>(undefined)
  const [messageLoading, setMessageLoading] = useState(false)

  const { state } = useContext(Context)
  const currentUser = state?.user?.address
  const { sendMessage, sendTyping, messages, typing, loading } = useConversation(
    props.ChatSelected?.uniqueName || ''
  )
  // const {conversations} = useTwilio()
  const conversation = props.ChatSelected
  const participantsAddress = useMemo(() => {
    const users = props?.ChatSelected?.uniqueName?.split('-') || []
    if (users[0] === currentUser) {
      return users[1]
    }
    return users[0]
  }, [currentUser, props?.ChatSelected?.uniqueName])

  const [messageCount, setMessageCount] = useState<number>(messages.length)
  const [ShowSearch, setShowSearch] = useState(false)
  const [searchText, setSearchText] = useState('')

  const ref = React.useRef<any>()
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [messages])

  const recorderControls = useAudioRecorder()

  return (
    <>
      <div className="flex flex-col justify-between w-full min-h-screen max-h-screen relative py-16 md:py-20">
        <div className=" absolute top-0 right-0  border-b border-primary-gray dark:border-secondary-text-dark h-16 lg:h-20 w-full flex justify-between items-center px-2 md:px-6 bg-gray-bg2 dark:bg-gray-bg-dark ">
          {ShowSearch ? (
            <div className="flex justify-between items-center py-2 w-full">
              <input
                placeholder="Search.."
                onChange={(e) => setSearchText(e.target.value)}
                className="px-6 py-2 w-full bg-gray-bg dark:bg-gray-bg2-dark rounded-lg outline-none"
              />
              <button className="outline-none p-4" onClick={() => setShowSearch(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <span
                  onClick={() => props.setChatSelected(undefined)}
                  className="h-[17px] w-5 ml-2 mr-3 cursor-pointer md:hidden"
                >
                  <Image src={LeftArrorwIcon} alt="" />
                </span>
                {/*<Image*/}
                {/*  src={props?.ChatSelected?.uniqueName || ''}*/}
                {/*  alt="user"*/}
                {/*  width={50}*/}
                {/*  height={50}*/}
                {/*  className="rounded-full"*/}
                {/*/>*/}
                <div className="ml-2">
                  <div className="d-flex flex-row">
                    <h4 className=" hidden md:block text-lg font-semibold w-full">
                      {participantsAddress}
                    </h4>
                    <h4 className=" md:hidden text-lg font-semibold w-full">
                      {walletnametrimmer(participantsAddress)}
                    </h4>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-primary-green h-2 w-2 rounded-full mr-2"></div>
                    <p className="text-sm font-normal text-secondary-text dark:text-secondary-text-dark">
                      Online
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-7">
                <Image
                  className="cursor-pointer"
                  height={20}
                  width={20}
                  alt="mic"
                  src={SearchIcon}
                  onClick={() => setShowSearch(true)}
                />
                <Image alt="mic" src={ThreeDotedIcon} className="mr-5 cursor-pointer" />
              </div>
            </>
          )}
        </div>
        <AboutUser isOpen={isOpen} setIsOpen={setIsOpen} data={props?.ChatSelected} />

        <div ref={ref} className="flex-1 flex flex-col px-6 overflow-y-auto pb-4" id="chatBox">
          {_.uniqBy(messages, 'sid')
            .sort(
              (msg1, msg2) =>
                new Date(msg1.dateCreated).getTime() - new Date(msg2.dateCreated).getTime()
            )
            .filter((m) => {
              if (searchText !== '') {
                return m?.body?.toLowerCase()?.includes(searchText.toLowerCase())
              }
              return true
            })
            .map((msg, index: number) => {
              const isMe = msg.author === currentUser
              return <SingleMessage key={index} message={msg} isMe={isMe} />
            })}
          {typing === participantsAddress && (
            <div
              className={`p-4 max-w-[60%] ${'self-start rounded-bl-none  bg-gray-bg dark:bg-gray-bg-dark'} my-2 rounded-lg`}
            >
              <p className="whitespace-pre-wrap">...</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 border-t dark:border-secondary-text-dark h-16 lg:h-20 w-full dark:bg-gray-bg-dark flex justify-between items-center px-6">
          {recording ? (
            <>
              <audio
                src={URL.createObjectURL(recording)}
                controls={true}
                className="object-contain w-full"
              ></audio>
            </>
          ) : (
            <>
              <textarea
                placeholder="Type a message"
                className="outline-none w-full font-normal text-sm h-full pt-6 lg:pt-8 dark:bg-gray-bg-dark"
                onChange={(e) => setInputValue(e.target.value)}
                value={InputValue}
                onKeyDown={() => sendTyping()}
                // onKeyDown={onAction}
              />
            </>
          )}
          {recorderControls.isRecording && (
            <p className="mr-2">
              {new Date(recorderControls.recordingTime * 1000).toISOString().slice(11, 19)}
            </p>
          )}
          {recorderControls?.isRecording ? (
            <FaStop
              className=" cursor-pointer text-primary-blue"
              style={{ fontSize: '26px' }}
              onClick={recorderControls.stopRecording}
            />
          ) : (
            <ImMic
              className=" cursor-pointer text-primary-blue"
              style={{ fontSize: '26px' }}
              onClick={recorderControls.startRecording}
            />
          )}
          <div className="hidden">
            <AudioRecorder
              onRecordingComplete={(v) => {
                setRecording(v)
              }}
              recorderControls={recorderControls}
            />
          </div>
          <input
            onChange={async (e) => {
              // @ts-ignore
              const file = e.target.files[0]
              if (file) {
                const raw = await file.arrayBuffer()
                const buffer = Buffer.from(raw)
                conversation?.sendMessage({
                  contentType: file.type,
                  media: buffer,
                })
              }
            }}
            accept="image/*"
            id="icon-button-file"
            type="file"
            style={{ display: 'none' }}
          />
          {recording ? (
            <IoClose
              className="cursor-pointer text-primary-blue"
              style={{ fontSize: '34px', marginLeft: '8px' }}
              onClick={() => setRecording(undefined)}
            />
          ) : (
            <label className=" cursor-pointer" htmlFor="icon-button-file">
              <AiOutlinePaperClip
                style={{ color: '#3254FE', fontSize: '28px', marginLeft: '8px' }}
              />
            </label>
          )}
          <button
            disabled={messageLoading}
            className={`${messageLoading ? 'hidden' : ''} cursor-pointer`}
            onClick={async () => {
              setMessageLoading(true)
              try {
                if (recording) {
                  const raw = await recording.arrayBuffer()
                  const buffer = Buffer.from(raw)
                  await conversation?.sendMessage({
                    contentType: 'audio/mp3',
                    media: buffer,
                  })
                } else {
                  await sendMessage(InputValue)
                }
                setRecording(undefined)
                setInputValue('')
                setMessageLoading(false)
              } catch (err) {
                setMessageLoading(false)
                console.log(err)
              }
            }}
          >
            <IoSendSharp style={{ color: '#3254FE', fontSize: '26px', marginLeft: '8px' }} />
          </button>
          {messageLoading && (
            <AiOutlineLoading3Quarters
              size={28}
              className=" text-primary-blue ml-2 animate-spin "
            />
          )}
        </div>
      </div>
    </>
  )
}

export default PersonalChat
