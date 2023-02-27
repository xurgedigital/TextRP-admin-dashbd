import Settings from "@/components/Settings";
import useWidth from "@/hooks/useWidth";
import DummyChatSection from "@/components/DummyChatSection";

export default function SettingPage() {
    const width = useWidth();

    return (
        <div className="flex max-h-screen">
            <Settings />
            {width > 768 && <DummyChatSection />}
        </div>
    );
}
