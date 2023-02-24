import ChatSection from "@/components/ChatSection";
import Subscriptions from "@/components/Subscriptions";

export default function SettingPage() {
    return (
        <div className="flex max-h-screen">
            <Subscriptions />
            <ChatSection />
        </div>
    );
}
