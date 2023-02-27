import DummyChatSection from "@/components/DummyChatSection";
import LinkedAccounts from "@/components/LinkedAccounts";
import useWidth from "@/hooks/useWidth";

export default function SettingPage() {
    const width = useWidth();

    return (
        <div className="flex max-h-screen">
            <LinkedAccounts />
            {width > 768 && <DummyChatSection/>}
        </div>
    );
}
