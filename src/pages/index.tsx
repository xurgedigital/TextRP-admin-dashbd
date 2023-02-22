
import InboxComp from "@/components/Inbox";
import ChatSection from "@/components/ChatSection";


export default function Home() {
  return (
    <div className="flex max-h-screen">
      <InboxComp />
      <ChatSection/>
    </div>
  );
}
