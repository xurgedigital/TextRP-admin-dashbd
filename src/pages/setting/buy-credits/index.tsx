import BuyCredits from "@/components/BuyCredits";
import ChatSection from "@/components/ChatSection";
import useWidth from "@/hooks/useWidth";

export default function SettingPage() {
    const width = useWidth();
    return (
        <div className="flex max-h-screen">
            <BuyCredits />
            {width > 768 && <ChatSection ChatSelected={null} />}
        </div>
    );
}
