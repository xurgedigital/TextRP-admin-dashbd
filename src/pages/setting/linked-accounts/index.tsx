import DummyChatSection from "@/components/DummyChatSection";
import LinkedAccounts from "@/components/LinkedAccounts";

export default function SettingPage() {

    return (
        <div className="flex max-h-screen overflow-x-hidden">
            <LinkedAccounts />
           <DummyChatSection/>
        </div>
    );
}
