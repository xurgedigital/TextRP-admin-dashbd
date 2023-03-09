import CommonButton from "@/components/common/CommonButton";
import CommonInput from "@/components/common/CommonInput";
import CommonTextArea from "@/components/common/CommonTextArea";
import SmallSwitch from "@/components/common/SmallSwitch";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const CreditItems = [
  {
    packageName: "Credits Package 1",
    numberOfCredits1: 50,
    numberOfCredits2: 3,
  },
  {
    packageName: "Credits Package 2",
    numberOfCredits1: 60,
    numberOfCredits2: 5,
  },
  {
    packageName: "Credits Package 3",
    numberOfCredits1: 70,
    numberOfCredits2: 2,
  },
  {
    packageName: "Credits Package 4",
    numberOfCredits1: 40,
    numberOfCredits2: 6,
  },
];

const PlatformSettingsComp = () => {
  const [NewBonus, setNewBonus] = useState<any>(0);
  const [NewMessage, setNewMessage] = useState<any>("");
  const [NewBonusEnabled, setNewBonusEnabled] = useState("false");
  const [PlatformData, setPlatformData] = useState<any>(null);
  const [WalletAddress, setWalletAddress] = useState("");
  const [ReceiveAddress, setReceiveAddress] = useState("");
  const [SeedKey, setSeedKey] = useState("");
  const [TwilioKey, setTwilioKey] = useState("");
  const [TwitterKey, setTwitterKey] = useState("");
  const [DiscordKey, setDiscordKey] = useState("");
  const [xummKey, setXummKey] = useState("");
  const [BonusLoader, setBonusLoader] = useState(false)
  const [MessageLoader, setMessageLoader] = useState(false)
  const [MicroPayLoader, setMicroPayLoader] = useState(false)
  const [ReceivePayLoader, setReceivePayLoader] = useState(false)
  const [ExternalAPILoader, setExternalAPILoader] = useState(false)

  const router = useRouter();
  const getPlatformSettings = () => {
    axios
      .get("/api/admin/platform_settings")
      .then((res) => {
        setPlatformData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          localStorage.clear();
          router.push("/login");
        }
      });
  };

  console.log(PlatformData, "platform data");

  const handleSaveLoginBonus = () => {
    setBonusLoader(true)
    let bonus = {
      key: "bonus",
      value: NewBonus,
    };
    let active = {
      key: "bonusActive",
      value: NewBonusEnabled,
    };
    if (PlatformData?.data?.some((arr: any) => arr.key === "bonus")) {
      let keyBonus =
        PlatformData?.data[
          PlatformData?.data?.findIndex((arr: any) => arr.key === "bonus")
        ]?.id;
      let keyBonusActive =
        PlatformData?.data[
          PlatformData?.data?.findIndex((arr: any) => arr.key === "bonusActive")
        ]?.id;
      console.log(
        PlatformData?.data?.indexOf((arr: any) => arr.key === "bonus")
      );
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, bonus)
        .then((res) => {
          console.log(res.data);
          axios
            .post(`/api/admin/platform_settings/${keyBonusActive}`, active)
            .then((res) => {
              console.log(res.data);
              setBonusLoader(false)
            })
            .catch((err) => {
              console.log(err);
              setBonusLoader(false)
            });
        })
        .catch((err) => {
          console.log(err);
          setBonusLoader(false)
        });
    } else {
      axios
        .post("/api/admin/platform_settings", bonus)
        .then((res) => {
          console.log(res.data);
          axios
            .post("/api/admin/platform_settings", active)
            .then((res) => {
              console.log(res.data);
              setBonusLoader(false)
            })
            .catch((err) => {
              console.log(err);
              setBonusLoader(false)
            });
        })
        .catch((err) => {
          console.log(err);
          setBonusLoader(false)
        });
    }
  };

  const handleSaveLoginMessage = () => {
    setMessageLoader(true)
    let messageContents = {
      key: "messageContents",
      value: NewMessage,
    };
    if (PlatformData?.data?.some((arr: any) => arr.key === "messageContents")) {
      let keyBonus =
        PlatformData?.data[
          PlatformData?.data?.findIndex(
            (arr: any) => arr.key === "messageContents"
          )
        ]?.id;
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, messageContents)
        .then((res) => {
          console.log(res.data);
          setMessageLoader(false)
        })
        .catch((err) => {
          console.log(err);
          setMessageLoader(false)
        });
    } else {
      axios
        .post("/api/admin/platform_settings", messageContents)
        .then((res) => {
          console.log(res.data);
          setMessageLoader(false)
        })
        .catch((err) => {
          console.log(err);
          setMessageLoader(false)
        });
    }
  };

  const handleSaveMicroPay = () => {
    setMicroPayLoader(true)
    let walletAddress = {
      key: "walletAddress",
      value: WalletAddress,
    };
    let active = {
      key: "seeedKey",
      value: NewBonusEnabled,
    };
    if (PlatformData?.data?.some((arr: any) => arr.key === "walletAddress")) {
      let keyBonus =
        PlatformData?.data[
          PlatformData?.data?.findIndex(
            (arr: any) => arr.key === "walletAddress"
          )
        ]?.id;
      let keyBonusActive =
        PlatformData?.data[
          PlatformData?.data?.findIndex((arr: any) => arr.key === "seeedKey")
        ]?.id;
      console.log(
        PlatformData?.data?.indexOf((arr: any) => arr.key === "walletAddress")
      );
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, walletAddress)
        .then((res) => {
          console.log(res.data);
          axios
            .post(`/api/admin/platform_settings/${keyBonusActive}`, active)
            .then((res) => {
              console.log(res.data);
              setMicroPayLoader(false)
            })
            .catch((err) => {
              console.log(err);
              setMicroPayLoader(false)
            });
        })
        .catch((err) => {
          console.log(err);
          setMicroPayLoader(false)
        });
    } else {
      axios
        .post("/api/admin/platform_settings", walletAddress)
        .then((res) => {
          console.log(res.data);
          axios
            .post("/api/admin/platform_settings", active)
            .then((res) => {
              console.log(res.data);
              setMicroPayLoader(false)
            })
            .catch((err) => {
              console.log(err);
              setMicroPayLoader(false)
            });
        })
        .catch((err) => {
          console.log(err);
          setMicroPayLoader(false)
        });
    }
  };

  const handleSaveReceivePay = () => {
    setReceivePayLoader(true)
    let receiveWallet = {
      key: "receiveWallet",
      value: ReceiveAddress,
    };
    if (PlatformData?.data?.some((arr: any) => arr.key === "receiveWallet")) {
      let keyBonus =
        PlatformData?.data[
          PlatformData?.data?.findIndex(
            (arr: any) => arr.key === "receiveWallet"
          )
        ]?.id;
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, receiveWallet)
        .then((res) => {
          console.log(res.data);
          setReceivePayLoader(false)
        })
        .catch((err) => {
          console.log(err);
          setReceivePayLoader(false)
        });
    } else {
      axios
        .post("/api/admin/platform_settings", receiveWallet)
        .then((res) => {
          console.log(res.data);
          setReceivePayLoader(false)
        })
        .catch((err) => {
          console.log(err);
          setReceivePayLoader(false)
        });
    }
  };

  const handleSaveExternalAPI = () => {
    setExternalAPILoader(true)
    let twilioKey = {
      key: "twilioKey",
      value: TwilioKey,
    };
    let twitterKey = {
      key: "twitterKey",
      value: TwitterKey,
    };
    let discordKey = {
      key: "discordKey",
      value: DiscordKey,
    };
    let XUMMKey = {
      key: "XUMMKey",
      value: xummKey,
    };
    if (PlatformData?.data?.some((arr: any) => arr.key === "twilioKey")) {
      let keyBonus =
        PlatformData?.data[
          PlatformData?.data?.findIndex((arr: any) => arr.key === "twilioKey")
        ]?.id;
      let keyBonusActive =
        PlatformData?.data[
          PlatformData?.data?.findIndex((arr: any) => arr.key === "twitterKey")
        ]?.id;
      let keyDiscord =
        PlatformData?.data[
          PlatformData?.data?.findIndex((arr: any) => arr.key === "discordKey")
        ]?.id;
      let keyXumm =
        PlatformData?.data[
          PlatformData?.data?.findIndex((arr: any) => arr.key === "XUMMKey")
        ]?.id;
      console.log(
        PlatformData?.data?.indexOf((arr: any) => arr.key === "twilioKey")
      );
      axios
        .post(`/api/admin/platform_settings/${keyBonus}`, twilioKey)
        .then((res) => {
          console.log(res.data);
          axios
            .post(`/api/admin/platform_settings/${keyBonusActive}`, twitterKey)
            .then((res) => {
              console.log(res.data);
              axios
                .post(`/api/admin/platform_settings/${keyDiscord}`, discordKey)
                .then((res) => {
                  console.log(res.data);
                  axios
                    .post(`/api/admin/platform_settings/${keyXumm}`, XUMMKey)
                    .then((res) => {
                      console.log(res.data);
                      setExternalAPILoader(false)
                    })
                    .catch((err) => {
                      console.log(err);
                      setExternalAPILoader(false)
                    });
                })
                .catch((err) => {
                  console.log(err);
                  setExternalAPILoader(false)
                });
            })
            .catch((err) => {
              console.log(err);
              setExternalAPILoader(false)
            });
        })
        .catch((err) => {
          console.log(err);
          setExternalAPILoader(false)
        });
    } else {
      axios
        .post("/api/admin/platform_settings", twilioKey)
        .then((res) => {
          console.log(res.data);
          axios
            .post("/api/admin/platform_settings", twitterKey)
            .then((res) => {
              console.log(res.data);
              axios
                .post("/api/admin/platform_settings", discordKey)
                .then((res) => {
                  console.log(res.data);
                  axios
                    .post("/api/admin/platform_settings", XUMMKey)
                    .then((res) => {
                      console.log(res.data);
                      setExternalAPILoader(false)
                    })
                    .catch((err) => {
                      console.log(err);
                      setExternalAPILoader(false)
                    });
                })
                .catch((err) => {
                  console.log(err);
                  setExternalAPILoader(false)
                });
            })
            .catch((err) => {
              console.log(err);
              setExternalAPILoader(false)
            });
        })
        .catch((err) => {
          console.log(err);
          setExternalAPILoader(false)
        });
    }
  };

  useEffect(() => {
    getPlatformSettings();
  }, []);

  useEffect(() => {
    console.log(
      PlatformData?.data?.find((arr: any) => arr.key == "bonus"),
      "cons"
    );
    PlatformData?.data?.find((arr: any) => arr.key == "bonus")?.value &&
      setNewBonus(
        PlatformData?.data?.find((arr: any) => arr.key == "bonus")?.value
      );
    PlatformData?.data?.find((arr: any) => arr.key == "bonusActive")?.value &&
      setNewBonusEnabled(
        PlatformData?.data?.find((arr: any) => arr.key == "bonusActive")?.value
      );
    PlatformData?.data?.find((arr: any) => arr.key == "messageContents")
      ?.value &&
      setNewMessage(
        PlatformData?.data?.find((arr: any) => arr.key == "messageContents")
          ?.value
      );
    PlatformData?.data?.find((arr: any) => arr.key == "walletAddress")?.value &&
      setWalletAddress(
        PlatformData?.data?.find((arr: any) => arr.key == "walletAddress")
          ?.value
      );
    PlatformData?.data?.find((arr: any) => arr.key == "seeedKey")?.value &&
      setSeedKey(
        PlatformData?.data?.find((arr: any) => arr.key == "seeedKey")?.value
      );
    PlatformData?.data?.find((arr: any) => arr.key == "receiveWallet")?.value &&
      setReceiveAddress(
        PlatformData?.data?.find((arr: any) => arr.key == "receiveWallet")
          ?.value
      );
      PlatformData?.data?.find((arr: any) => arr.key == "twilioKey")
      ?.value &&
      setTwilioKey(
        PlatformData?.data?.find((arr: any) => arr.key == "twilioKey")
          ?.value
      );
    PlatformData?.data?.find((arr: any) => arr.key == "twitterKey")?.value &&
      setTwitterKey(
        PlatformData?.data?.find((arr: any) => arr.key == "twitterKey")
          ?.value
      );
    PlatformData?.data?.find((arr: any) => arr.key == "discordKey")?.value &&
      setDiscordKey(
        PlatformData?.data?.find((arr: any) => arr.key == "discordKey")?.value
      );
    PlatformData?.data?.find((arr: any) => arr.key == "XUMMKey")?.value &&
      setXummKey(
        PlatformData?.data?.find((arr: any) => arr.key == "XUMMKey")
          ?.value
      );
  }, [PlatformData]);

  return (
    <div className="w-full max-w-[660px]">
      <p className="text-2xl font-semibold">First Time Login Bonus</p>
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
            setNewBonusEnabled(JSON.stringify(value));
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

      <p className="text-2xl font-semibold mt-8">Micropayments</p>
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
      </div>

      <p className="text-2xl font-semibold mt-8">Receive Payments</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 pt-3 bg-white mt-3">
        <CommonInput
          label="Wallet Address"
          value={ReceiveAddress}
          onChange={(e) => setReceiveAddress(e.target.value)}
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonButton
          label="Save"
          onClick={() => handleSaveReceivePay()}
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
          disabled={TwilioKey.length === 0 || TwitterKey.length === 0 || DiscordKey.length === 0 || xummKey.length === 0}
        />
      </div>
    </div>
  );
};

export default PlatformSettingsComp;
