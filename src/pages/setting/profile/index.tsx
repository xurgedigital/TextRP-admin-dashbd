import DummyChatSection from "@/components/DummyChatSection";
import Settings from "@/components/Settings";

export default function SettingPage() {
    return (
        <div className="flex max-h-screen overflow-x-hidden">
            <Settings />
            <DummyChatSection/>
        </div>
    );
}
