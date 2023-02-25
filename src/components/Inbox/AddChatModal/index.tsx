import React, { useState } from "react";
import Image from "next/image";
import DiscordIcon from "@public/Icons/discordFilterIcon.svg";
import TwitterIcon from "@public/Icons/twitterFilterIcon.svg";
import TwiloIcon from "@public/Icons/twiloFilterIcon.svg";
import XRPIcon from "@public/Icons/xrpFilterIcon.svg";

interface Iprops {
  openNewChatModal: boolean;
  setOpenNewChatModal: (value: boolean) => void;
}
const AddChatModal = (props: Iprops) => {
    const [isMount , setMount] = useState(true);

    React.useEffect(()=>{
        if(isMount){
            setMount(false)
        }
    },[])

    const ref = React.useRef<any>(null);

    const handleClickOutside = (event:any) => {
        if (ref.current && !ref.current?.contains(event.target)) {
            props.setOpenNewChatModal(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

  return (
    <div className="absolute z-10 h-full w-full top-0 right-0 blurBG  ">
      <div ref={ref} className={`absolute z-50 bottom-0 left-0 w-full border-[#ACB1C1] border-0.5 p-6 newChatMobile bg-white opacity-100 transition duration-300 ${isMount ? "translate-y-full" : "translate-y-0" } `}>
        <div className="text-base font-semibold mb-4">Choose Platform</div>
        <div className=" mb-4 flex items-center gap-4">
          <span className="w-8 h-8 relative">
            <Image fill src={DiscordIcon} alt="" />
          </span>
          <div className=" text-xs font-normal">Discord</div>
        </div>
        <div className=" mb-4 flex items-center gap-4">
          <span className="w-8 h-8 relative">
            <Image fill src={TwitterIcon} alt="" />
          </span>
          <div className=" text-xs font-normal">Twitter</div>
        </div>
        <div className=" mb-4 flex items-center gap-4">
          <span className="w-8 h-8 relative">
            <Image fill src={TwiloIcon} alt="" />
          </span>
          <div className=" text-xs font-normal">Twilio</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 relative">
            <Image fill src={XRPIcon} alt="" />
          </span>
          <div className=" text-xs font-normal">XRP</div>
        </div>
      </div>
    </div>
  );
};

export default AddChatModal;
