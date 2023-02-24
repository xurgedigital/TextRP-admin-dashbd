import ChatSection from "@/components/ChatSection";
import Subscriptions from "@/components/Subscriptions";
import useWidth from "@/hooks/useWidth";

export default function SettingPage() {
    const width = useWidth();

    return (
        <div className="flex max-h-screen">
            <Subscriptions />
            {width > 768 && <ChatSection ChatSelected={null} />}
        </div>
    );
}
