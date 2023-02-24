import InboxComp from "@/components/Inbox";
import ChatSection from "@/components/ChatSection";
import { useState } from "react";
import PersonalChat from "@/components/PersonalChat";
import Settings from "@/components/Settings";
import BuyCredits from "@/components/BuyCredits";
import Subscriptions from "@/components/Subscriptions";
import LinkedAccounts from "@/components/LinkedAccounts";

export default function Home() {
  const [ChatSelected, setChatSelected] = useState(null);
  const [showSetting, setShowSetting] = useState(false);
  return (
    <div className="flex max-h-screen">
      {!showSetting ? <InboxComp setChatSelected={setChatSelected} setShowSetting={setShowSetting} /> : <LinkedAccounts/>}
      {/* {!showSetting ? <InboxComp setChatSelected={setChatSelected} setShowSetting={setShowSetting} /> : <BuyCredits/>} */}
      {/* {!showSetting ? <InboxComp setChatSelected={setChatSelected} setShowSetting={setShowSetting} /> : <Settings setShowSetting={setShowSetting}/>} */}
      {ChatSelected === null ? <ChatSection /> : <PersonalChat ChatSelected={ChatSelected} />}
    </div>
  );
}
