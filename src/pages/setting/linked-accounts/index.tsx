import ChatSection from "@/components/ChatSection";
import LinkedAccounts from "@/components/LinkedAccounts";

export default function SettingPage() {
    return (
        <div className="flex max-h-screen">
            <LinkedAccounts />
            <ChatSection />
        </div>
    );
}
