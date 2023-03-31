import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useState } from 'react'
import TwilioContext from 'twilio-conversations-hooks/lib/contexts/TwilioContext'
import { Context } from '@/pages/_app'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function CreateChat({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: Function
}) {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const { client } = useContext(TwilioContext)
  const { state }: any = useContext(Context)

  async function closeModal() {
    setLoading(true)
    try {
      console.log('store?.user', state?.user)
      const conversation = await client.createConversation({
        uniqueName: `${state?.user?.address}-${address}`,
        friendlyName: `${state?.user?.address}-${address}`,
      })
      await conversation.join()
      await conversation.add(address)
      console.log('conversation', conversation)

      setIsOpen(false)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Create Chat
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      placeholder={'Address'}
                      className="p-3 rounded-lg bg-gray-bg outline-none border border-primary-gray text-secondary-text"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                      disabled={loading}
                    >
                      {!loading ? (
                        'Create'
                      ) : (
                        <AiOutlineLoading3Quarters
                          size={20}
                          className=" text-primary-blue animate-spin "
                        />
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
