import ChatSection from "@/components/ChatSection";
import Settings from "@/components/Settings";
import useWidth from "@/hooks/useWidth";

export default function SettingPage() {
    const width = useWidth();
    return (
        <div className="flex max-h-screen">
            <Settings />
            {width > 768 && <ChatSection ChatSelected={null} />}
        </div>
    );
}
