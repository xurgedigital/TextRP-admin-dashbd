import InboxComp from "@/components/Inbox";
import ChatSection from "@/components/ChatSection";
import { useState } from "react";
import PersonalChat from "@/components/PersonalChat";
import Settings from "@/components/Settings";
import LinkedAccounts from "@/components/LinkedAccounts";

export default function SettingPage() {
    return (
        <div className="flex max-h-screen">
            <Settings />
            <ChatSection />
        </div>
    );
}
