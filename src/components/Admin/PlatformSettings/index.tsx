import CommonButton from '@/components/common/CommonButton'
import CommonInput from '@/components/common/CommonInput'
import CommonTextArea from '@/components/common/CommonTextArea'
import SmallSwitch from '@/components/common/SmallSwitch'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isValidClassicAddress } from 'ripple-address-codec'

const PlatformSettingsComp = () => {
  const [discordSendKey, setDiscordSendKey] = useState<any>('')
  const [twilioSendKey, setTwilioSendKey] = useState<any>('')
  const [twitterSendKey, setTwitterSendKey] = useState<any>('')
  const [NewBonus, setNewBonus] = useState<any>(0)
  const [NewMessage, setNewMessage] = useState<any>('')
  const [NewBonusEnabled, setNewBonusEnabled] = useState('false')
  const [PlatformData, setPlatformData] = useState<any>(null)
  const [WalletAddress, setWalletAddress] = useState('')
  const [ReceiveAddress, setReceiveAddress] = useState('')
  const [SeedKey, setSeedKey] = useState('')
  const [TwilioKey, setTwilioKey] = useState('')
  const [TwitterKey, setTwitterKey] = useState('')
  const [DiscordKey, setDiscordKey] = useState('')
  const [xummKey, setXummKey] = useState('')
  const [BonusLoader, setBonusLoader] = useState(false)
  const [MessageLoader, setMessageLoader] = useState(false)
  const [MicroPayLoader, setMicroPayLoader] = useState(false)
  const [ReceivePayLoader, setReceivePayLoader] = useState(false)
  const [ExternalAPILoader, setExternalAPILoader] = useState(false)
  const [creditsLoading, setCreditsLoading] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [nodeUrl, setNodeUrl] = useState('')
  const [intraSend, setIntraSend] = useState('')
  const [smsSend, setSmsSend] = useState('')
  const [smsReceive, setSmsReceive] = useState('')
  const [callForward, setCallForward] = useState('')
  const [xrplSend, setXrplSend] = useState('')
  const [voiceMessage, setVoiceMessage] = useState('')
  const [intraVoice, setIntraVoice] = useState('')
  const [videoCall, setVideoCall] = useState('')
  const [slackSend, setSlackSend] = useState('')
  const [linkedinSend, setLinkedinSend] = useState('')
  const [instagramSend, setInstagramSend] = useState('')

  const router = useRouter()
  const getPlatformSettings = () => {
    axios
      .get('/api/admin/platform_settings?limit=20')
      .then((res) => {
        setPlatformData(res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear()
          router.push('/login')
        }
      })
  }

  const handleSaveLoginBonus = () => {
    setBonusLoader(true)
    let bonus = {
      key: 'bonus',
      value: NewBonus,
    }
    let active = {
      key: 'bonusActive',
      value: NewBonusEnabled,
    }
    if (PlatformData?.data?.some((arr: any) => arr.key === 'bonus')) {
      let keyBonus =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'bonus')]?.id
      let keyBonusActive =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'bonusActive')]
          ?.id
      console.log(PlatformData?.data?.indexOf((arr: any) => arr.key === 'bonus'))
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, bonus)
        .then((res) => {
          console.log(res.data)
          axios
            .post(`/api/admin/platform_settings/${keyBonusActive}`, active)
            .then((res) => {
              console.log(res.data)
              setBonusLoader(false)
            })
            .catch((err) => {
              console.log(err)
              setBonusLoader(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setBonusLoader(false)
        })
    } else {
      axios
        .post('/api/admin/platform_settings', bonus)
        .then((res) => {
          console.log(res.data)
          axios
            .post('/api/admin/platform_settings', active)
            .then((res) => {
              console.log(res.data)
              setBonusLoader(false)
            })
            .catch((err) => {
              console.log(err)
              setBonusLoader(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setBonusLoader(false)
        })
    }
  }

  const handleSaveLoginMessage = () => {
    setMessageLoader(true)
    let messageContents = {
      key: 'messageContents',
      value: NewMessage,
    }
    if (PlatformData?.data?.some((arr: any) => arr.key === 'messageContents')) {
      let keyBonus =
        PlatformData?.data[
          PlatformData?.data?.findIndex((arr: any) => arr.key === 'messageContents')
        ]?.id
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, messageContents)
        .then((res) => {
          console.log(res.data)
          setMessageLoader(false)
        })
        .catch((err) => {
          console.log(err)
          setMessageLoader(false)
        })
    } else {
      axios
        .post('/api/admin/platform_settings', messageContents)
        .then((res) => {
          console.log(res.data)
          setMessageLoader(false)
        })
        .catch((err) => {
          console.log(err)
          setMessageLoader(false)
        })
    }
  }

  const handleSaveMicroPay = () => {
    setMicroPayLoader(true)
    let walletAddress = {
      key: 'walletAddress',
      value: WalletAddress,
    }
    let active = {
      key: 'seeedKey',
      value: NewBonusEnabled,
    }
    if (PlatformData?.data?.some((arr: any) => arr.key === 'walletAddress')) {
      let keyBonus =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'walletAddress')]
          ?.id
      let keyBonusActive =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'seeedKey')]?.id
      console.log(PlatformData?.data?.indexOf((arr: any) => arr.key === 'walletAddress'))
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, walletAddress)
        .then((res) => {
          console.log(res.data)
          axios
            .post(`/api/admin/platform_settings/${keyBonusActive}`, active)
            .then((res) => {
              console.log(res.data)
              setMicroPayLoader(false)
            })
            .catch((err) => {
              console.log(err)
              setMicroPayLoader(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setMicroPayLoader(false)
        })
    } else {
      axios
        .post('/api/admin/platform_settings', walletAddress)
        .then((res) => {
          console.log(res.data)
          axios
            .post('/api/admin/platform_settings', active)
            .then((res) => {
              console.log(res.data)
              setMicroPayLoader(false)
            })
            .catch((err) => {
              console.log(err)
              setMicroPayLoader(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setMicroPayLoader(false)
        })
    }
  }
  const handleSaveCredits = () => {
    setCreditsLoading(true)
    let walletAddress = {
      key: 'walletAddress',
      value: WalletAddress,
    }
    let active = {
      key: 'seeedKey',
      value: NewBonusEnabled,
    }
    axios
      .post(`/api/admin/platform_settings/bulk`, {
        settings: [
          {
            key: 'intra_app_send',
            value: intraSend,
          },
          {
            key: 'sms_mms_send',
            value: smsSend,
          },
          {
            key: 'sms_mms_receive',
            value: smsReceive,
          },
          {
            key: 'call_forwarding',
            value: callForward,
          },
          {
            key: 'XRPL_send',
            value: xrplSend,
          },
          {
            key: 'voice_message',
            value: voiceMessage,
          },
          {
            key: 'intra_app_voice_call',
            value: intraVoice,
          },
          {
            key: 'video_call',
            value: videoCall,
          },
          {
            key: 'discord_send',
            value: discordSendKey,
          },
          {
            key: 'twitter_send',
            value: twitterSendKey,
          },
          {
            key: 'twilio_send',
            value: twitterSendKey,
          },
          {
            key: 'slack_send',
            value: slackSend,
          },
          {
            key: 'linkedin_send',
            value: linkedinSend,
          },
          {
            key: 'instagram_send',
            value: instagramSend,
          },
        ],
      })
      .then((res) => {
        console.log(res.data)
        setCreditsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setCreditsLoading(false)
      })
  }

  const handleSaveReceivePay = () => {
    setReceivePayLoader(true)
    if (!isValidClassicAddress(ReceiveAddress)) {
      setAddressError(true)
      setReceivePayLoader(false)
      return
    }
    let receiveWallet = {
      key: 'receiveWallet',
      value: ReceiveAddress,
    }
    if (PlatformData?.data?.some((arr: any) => arr.key === 'receiveWallet')) {
      let keyBonus =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'receiveWallet')]
          ?.id
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, receiveWallet)
        .then((res) => {
          console.log(res.data)
          setReceivePayLoader(false)
        })
        .catch((err) => {
          console.log(err)
          setReceivePayLoader(false)
        })
    } else {
      axios
        .post('/api/admin/platform_settings', receiveWallet)
        .then((res) => {
          console.log(res.data)
          setReceivePayLoader(false)
        })
        .catch((err) => {
          console.log(err)
          setReceivePayLoader(false)
        })
    }
  }

  const handleSaveExternalAPI = () => {
    setExternalAPILoader(true)
    let twilioKey = {
      key: 'twilioKey',
      value: TwilioKey,
    }
    let twitterKey = {
      key: 'twitterKey',
      value: TwitterKey,
    }
    let discordKey = {
      key: 'discordKey',
      value: DiscordKey,
    }
    let XUMMKey = {
      key: 'XUMMKey',
      value: xummKey,
    }
    if (PlatformData?.data?.some((arr: any) => arr.key === 'twilioKey')) {
      let keyBonus =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'twilioKey')]?.id
      let keyBonusActive =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'twitterKey')]
          ?.id
      let keyDiscord =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'discordKey')]
          ?.id
      let keyXumm =
        PlatformData?.data[PlatformData?.data?.findIndex((arr: any) => arr.key === 'XUMMKey')]?.id
      console.log(PlatformData?.data?.indexOf((arr: any) => arr.key === 'twilioKey'))
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, twilioKey)
        .then((res) => {
          console.log(res.data)
          axios
            .post(`/api/admin/platform_settings/${keyBonusActive}`, twitterKey)
            .then((res) => {
              console.log(res.data)
              axios
                .post(`/api/admin/platform_settings/${keyDiscord}`, discordKey)
                .then((res) => {
                  console.log(res.data)
                  axios
                    .post(`/api/admin/platform_settings/${keyXumm}`, XUMMKey)
                    .then((res) => {
                      console.log(res.data)
                      setExternalAPILoader(false)
                    })
                    .catch((err) => {
                      console.log(err)
                      setExternalAPILoader(false)
                    })
                })
                .catch((err) => {
                  console.log(err)
                  setExternalAPILoader(false)
                })
            })
            .catch((err) => {
              console.log(err)
              setExternalAPILoader(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setExternalAPILoader(false)
        })
    } else {
      axios
        .post('/api/admin/platform_settings', twilioKey)
        .then((res) => {
          console.log(res.data)
          axios
            .post('/api/admin/platform_settings', twitterKey)
            .then((res) => {
              console.log(res.data)
              axios
                .post('/api/admin/platform_settings', discordKey)
                .then((res) => {
                  console.log(res.data)
                  axios
                    .post('/api/admin/platform_settings', XUMMKey)
                    .then((res) => {
                      console.log(res.data)
                      setExternalAPILoader(false)
                    })
                    .catch((err) => {
                      console.log(err)
                      setExternalAPILoader(false)
                    })
                })
                .catch((err) => {
                  console.log(err)
                  setExternalAPILoader(false)
                })
            })
            .catch((err) => {
              console.log(err)
              setExternalAPILoader(false)
            })
        })
        .catch((err) => {
          console.log(err)
          setExternalAPILoader(false)
        })
    }
  }

  useEffect(() => {
    getPlatformSettings()
  }, [])

  useEffect(() => {
    console.log(
      PlatformData?.data?.find((arr: any) => arr.key == 'bonus'),
      'cons'
    )
    PlatformData?.data?.find((arr: any) => arr.key == 'bonus')?.value &&
      setNewBonus(PlatformData?.data?.find((arr: any) => arr.key == 'bonus')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'bonusActive')?.value &&
      setNewBonusEnabled(PlatformData?.data?.find((arr: any) => arr.key == 'bonusActive')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'messageContents')?.value &&
      setNewMessage(PlatformData?.data?.find((arr: any) => arr.key == 'messageContents')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'walletAddress')?.value &&
      setWalletAddress(PlatformData?.data?.find((arr: any) => arr.key == 'walletAddress')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'seeedKey')?.value &&
      setSeedKey(PlatformData?.data?.find((arr: any) => arr.key == 'seeedKey')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'receiveWallet')?.value &&
      setReceiveAddress(PlatformData?.data?.find((arr: any) => arr.key == 'receiveWallet')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'twilioKey')?.value &&
      setTwilioKey(PlatformData?.data?.find((arr: any) => arr.key == 'twilioKey')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'twitterKey')?.value &&
      setTwitterKey(PlatformData?.data?.find((arr: any) => arr.key == 'twitterKey')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'discordKey')?.value &&
      setDiscordKey(PlatformData?.data?.find((arr: any) => arr.key == 'discordKey')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'XUMMKey')?.value &&
      setXummKey(PlatformData?.data?.find((arr: any) => arr.key == 'XUMMKey')?.value)

    PlatformData?.data?.find((arr: any) => arr.key == 'discord_send')?.value &&
      setDiscordSendKey(PlatformData?.data?.find((arr: any) => arr.key == 'discord_send')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'twitter_send')?.value &&
      setTwitterSendKey(PlatformData?.data?.find((arr: any) => arr.key == 'twitter_send')?.value)
    PlatformData?.data?.find((arr: any) => arr.key == 'twilio_send')?.value &&
      setTwilioSendKey(PlatformData?.data?.find((arr: any) => arr.key == 'twilio_send')?.value)
  }, [PlatformData])

  return (
    <div className="w-full max-w-[660px]">
      <p className="text-2xl font-semibold">XRPL Node</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 pt-3 bg-white mt-3">
        <CommonInput
          label="Node URL"
          placeholder="wss://s.altnet.rippletest.net:5123"
          value={nodeUrl}
          type="text"
          onChange={(e) => setNodeUrl(e.target.value)}
        />
        <CommonButton
          label="Save"
          isLoading={BonusLoader}
          onClick={() => handleSaveLoginBonus()}
          disabled={NewBonus.length === 0}
        />
      </div>

      <p className="text-2xl font-semibold mt-8">First Time Login Bonus</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 pt-3 bg-white mt-3">
        <CommonInput
          label="Set New Bonus (in Credits)"
          placeholder="Ex. 500"
          value={NewBonus}
          type="number"
          onChange={(e) => setNewBonus(e.target.value)}
          message="Current Bonus: 250 Credits"
        />
        <SmallSwitch
          label="Active"
          enabled={JSON.parse(NewBonusEnabled)}
          enableColor="#3052FF"
          setEnabled={(value) => {
            setNewBonusEnabled(JSON.stringify(value))
          }}
        />
        <CommonButton
          label="Save"
          isLoading={BonusLoader}
          onClick={() => handleSaveLoginBonus()}
          disabled={NewBonus.length === 0}
        />
      </div>

      <p className="text-2xl font-semibold mt-8">First Time Login Message</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3">
        <CommonTextArea
          label="Message Contents"
          placeholder="Ex. 500"
          value={NewMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          message="Max 500 characters"
        />
        <CommonButton
          label="Save"
          onClick={() => handleSaveLoginMessage()}
          disabled={NewMessage.length === 0}
          isLoading={MessageLoader}
        />
      </div>

      {/* <p className="text-2xl font-semibold mt-8">Micropayments</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 pt-3 bg-white mt-3">
        <CommonInput
          label="Wallet Address"
          value={WalletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonInput
          label="Seed Key"
          value={SeedKey}
          onChange={(e) => setSeedKey(e.target.value)}
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonButton
          label="Save"
          onClick={() => handleSaveMicroPay()}
          isLoading={MicroPayLoader}
          disabled={WalletAddress.length === 0 || SeedKey.length === 0}
        />
      </div> */}

      <p className="text-2xl font-semibold mt-8">Receive Payments</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 pt-3 bg-white mt-3">
        <CommonInput
          label="Wallet Address"
          value={ReceiveAddress}
          onChange={(e) => setReceiveAddress(e.target.value)}
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        {addressError ? (
          <p className=" sm:pl-20 md:pl-28 text-xs text-red-500">Enter valid XRP address !</p>
        ) : null}
        <CommonButton
          label="Save"
          onClick={handleSaveReceivePay}
          isLoading={ReceivePayLoader}
          disabled={ReceiveAddress.length === 0}
        />
      </div>

      <p className="text-2xl font-semibold mt-8">External API Keys</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 pt-3 bg-white mt-3">
        <CommonInput
          label="Twilio API Key"
          value={TwilioKey}
          onChange={(e) => setTwilioKey(e.target.value)}
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonInput
          label="Twitter API Key"
          value={TwitterKey}
          onChange={(e) => setTwitterKey(e.target.value)}
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonInput
          label="Discord API Key"
          value={DiscordKey}
          onChange={(e) => setDiscordKey(e.target.value)}
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonInput
          label="XUMM API Key"
          value={xummKey}
          onChange={(e) => setXummKey(e.target.value)}
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonButton
          label="Save"
          onClick={() => handleSaveExternalAPI()}
          isLoading={ExternalAPILoader}
          disabled={
            TwilioKey.length === 0 ||
            TwitterKey.length === 0 ||
            DiscordKey.length === 0 ||
            xummKey.length === 0
          }
        />
      </div>

      <p className="text-2xl font-semibold mt-8">Credits</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 pt-3 bg-white mt-3">
        <CommonInput
          label="Intra-app Send"
          value={intraSend}
          onChange={(e) => setIntraSend(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="SMS/MMS Send"
          value={smsSend}
          onChange={(e) => setSmsSend(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="SMS/MMS Receive"
          value={smsReceive}
          onChange={(e) => setSmsReceive(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Call-forwarding (per call)"
          value={callForward}
          onChange={(e) => setCallForward(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="XRPL Send"
          value={xrplSend}
          onChange={(e) => setXrplSend(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Voice Message"
          value={voiceMessage}
          onChange={(e) => setVoiceMessage(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Intra-app Voice Call (per minute)"
          value={intraVoice}
          onChange={(e) => setIntraVoice(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Video Call (per minute)"
          value={videoCall}
          onChange={(e) => setVideoCall(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Discord Send"
          value={discordSendKey}
          onChange={(e) => setDiscordSendKey(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Twilio Send"
          value={twitterSendKey}
          onChange={(e) => setTwilioSendKey(e.target.value)}
          placeholder="Ex. 0.1"
          fullWidth
        />
        <CommonInput
          label="Twitter Send"
          value={twitterSendKey}
          onChange={(e) => setTwitterSendKey(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Slack Send"
          value={slackSend}
          onChange={(e) => setSlackSend(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Linkedin Send"
          value={linkedinSend}
          onChange={(e) => setLinkedinSend(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonInput
          label="Instagram Send"
          value={instagramSend}
          onChange={(e) => setInstagramSend(e.target.value)}
          placeholder="Ex. 1"
          fullWidth
        />
        <CommonButton
          label="Save"
          onClick={() => handleSaveCredits()}
          isLoading={creditsLoading}
          disabled={discordSendKey.length === 0 || twitterSendKey.length === 0}
        />
      </div>
    </div>
  )
}

export default PlatformSettingsComp
