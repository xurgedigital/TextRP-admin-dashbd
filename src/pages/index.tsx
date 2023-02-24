import InboxComp from "@/components/Inbox";
import ChatSection from "@/components/ChatSection";
import { useState } from "react";
import PersonalChat from "@/components/PersonalChat";
import useWidth from "@/hooks/useWidth";

export default function Home() {
  const [ChatSelected, setChatSelected] = useState(null);
  const width = useWidth();
  return (
    <div className="flex max-h-screen">
      <InboxComp setChatSelected={setChatSelected} />
      {width > 768 && <ChatSection ChatSelected={ChatSelected} />}
    </div>
  );
}
