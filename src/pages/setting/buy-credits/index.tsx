import BuyCredits from "@/components/BuyCredits";
import DummyChatSection from "@/components/DummyChatSection";
import useWidth from "@/hooks/useWidth";

export default function SettingPage() {
    const width = useWidth();
    return (
        <div className="flex max-h-screen">
            <BuyCredits />
            {width > 768 && <DummyChatSection />}
        </div>
    );
}
