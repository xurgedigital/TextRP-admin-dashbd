import InboxComp from "@/components/Inbox";
import ChatSection from "@/components/ChatSection";
import { useState } from "react";
import PersonalChat from "@/components/PersonalChat";

export default function Home() {
  const [ChatSelected, setChatSelected] = useState(null);
  return (
    <div className="flex max-h-screen">
      <InboxComp setChatSelected={setChatSelected} />
      {ChatSelected === null ? <ChatSection /> : <PersonalChat ChatSelected={ChatSelected} />}
    </div>
  );
}
