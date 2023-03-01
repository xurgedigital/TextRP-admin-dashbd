import DummyChatSection from "@/components/DummyChatSection";
import Subscriptions from "@/components/Subscriptions";

export default function SettingPage() {

    return (
        <div className="flex max-h-screen overflow-hidden">
            <Subscriptions />
            <DummyChatSection />
        </div>
    );
}
