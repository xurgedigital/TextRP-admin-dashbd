import CommonButton from "@/components/common/CommonButton";
import CommonInput from "@/components/common/CommonInput";
import CommonTextArea from "@/components/common/CommonTextArea";
import SmallSwitch from "@/components/common/SmallSwitch";
import React from "react";

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
  return (
    <div>
      <p className="text-2xl font-semibold">First Time Login Bonus</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3">
        <CommonInput
          label="Set New Bonus (in Credits)"
          placeholder="Ex. 500"
          message="Current Bonus: 250 Credits"
        />
        <SmallSwitch
          label="Active"
          enabled={true}
          enableColor="#3052FF"
          setEnabled={(value) => {
            alert(value);
          }}
        />
        <CommonButton label="Save" />
      </div>

      <p className="text-2xl font-semibold mt-8">First Time Login Message</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3">
        <CommonTextArea
          label="Message Contents"
          placeholder="Ex. 500"
          message="Max 500 characters"
        />
        <CommonButton label="Save" />
      </div>

      <p className="text-2xl font-semibold mt-8">Micropayments</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3">
        <CommonInput
          label="Wallet Address"
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonInput
          label="Seed Key"
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonButton label="Save" />
      </div>

      <p className="text-2xl font-semibold mt-8">Receive Payments</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3">
        <CommonInput
          label="Wallet Address"
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonButton label="Save" />
      </div>

      <p className="text-2xl font-semibold mt-8">External API Keys</p>
      <div className="shadow-shadow-tertiary rounded-lg p-6 bg-white mt-3">
        <CommonInput
          label="Twilio API Key"
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonInput
          label="Twitter API Key"
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
         <CommonInput
          label="Discord API Key"
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
         <CommonInput
          label="XUMM API Key"
          placeholder="Ex. 0x05f7903195f7110e318fce46973aa72adeafd0e8"
          fullWidth
        />
        <CommonButton label="Save" />
      </div>
    </div>
  );
};

export default PlatformSettingsComp;
