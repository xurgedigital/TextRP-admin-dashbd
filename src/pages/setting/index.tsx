import Settings from "@/components/Settings";
import DummyChatSection from "@/components/DummyChatSection";

export default function SettingPage() {

    return (
        <div className="flex max-h-screen overflow-x-hidden">
            <Settings />
            <DummyChatSection />
        </div>
    );
}
