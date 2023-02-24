import InboxComp from "@/components/Inbox";
import ChatSection from "@/components/ChatSection";
import { useState } from "react";
import PersonalChat from "@/components/PersonalChat";
import Settings from "@/components/Settings";
import LinkedAccounts from "@/components/LinkedAccounts";
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
