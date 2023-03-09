import React from "react";
import { Switch } from "@headlessui/react";

interface Iprops {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  label?: string;
  className?: string;
  enableColor?: string;
  disableColor?: string;
}

const SmallSwitch = (props: Iprops) => {
  const { enabled, setEnabled, label, className, enableColor, disableColor } =
    props;
  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row items-start justify-between text-sm font-normal sm:pr-20 lg:pr-40 mt-6">
        <div className="text-black">
          {label}
        </div>
        <div className="min-w-[200px] flex justify-start">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-primary-blue" : "bg-slate-400"
          } relative inline-flex h-[25px] w-[45px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}>
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              enabled
                ? `translate-x-6 bg-[#ffffff]`
                : `translate-x-1 ${disableColor ?? "bg-[#fff]"}`
            }
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full  my-auto shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
        </div>
      </div>
    </div>
  );
};

export default SmallSwitch;
