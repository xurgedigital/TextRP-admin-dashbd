import ChatSection from "@/components/ChatSection";
import Settings from "@/components/Settings";

export default function SettingPage() {
    return (
        <div className="flex max-h-screen">
            <Settings />
            <ChatSection />
        </div>
    );
}
