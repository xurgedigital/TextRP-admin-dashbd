import Image from "next/image";
import React from "react";
import EditIcon from "@public/Icons/editIcon.svg";
import Switch from "react-switch";
import NFT1 from "@public/Images/nft/img1.svg";
import NFT2 from "@public/Images/nft/img2.svg";
import NFT3 from "@public/Images/nft/img3.svg";
import NFT4 from "@public/Images/nft/img4.svg";

const EditPage = () => {
  const [active, setActive] = React.useState(false);
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:flex-[0.6]">
          <span className=" text-xl font-semibold mb-3">Edit User</span>
          <div className=" rounded-lg shadow-shadow-tertiary p-6 mt-3 bg-white">
            <div className="flex text-sm text-primary-text font-normal ">
              <div className="flex-[0.3]">
                <div className="mb-4">Account Name</div>
                <div className="mb-4">Wallet Address</div>
                <div className="mb-4">Subscription</div>
                <div className="mb-4">Subscription Plan</div>
                <div className="mb-4">Subscription Start Date</div>
                <div className="mb-4">Account Creation Date</div>
                <div>Active</div>
              </div>
              <div className="flex-[0.7]">
                <div className="flex justify-between items-center mb-4">
                  <div className="">First name Last Name</div>
                  <span className=" cursor-pointer">
                    <Image height={16} width={16} src={EditIcon} alt="" />
                  </span>
                </div>
                <div className="mb-4">
                  0x05f7903195f7110e318fce46973aa72adeafd0e8
                </div>
                <div className="mb-4">Active</div>
                <div className="mb-4">Monthly</div>
                <div className="mb-4">25 Jan 2023, 01:00 PM</div>
                <div className="mb-4">25 Jan 2023, 01:00 PM</div>
                <div>
                  <Switch
                    onChange={setActive}
                    checked={active}
                    onColor="#3052FF"
                    uncheckedIcon={false}
                    checkedIcon={false}
                    handleDiameter={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex-[0.4]">
          <span className=" text-xl font-semibold mb-3">
            Credits & Discount
          </span>
          <div className=" rounded-lg shadow-shadow-tertiary p-6 mt-3 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div className="flex justify-between justify-between items-center w-1/2">
                <div>Credits Balance</div>
                <div>25</div>
              </div>
              <span className=" cursor-pointer">
                <Image height={16} width={16} src={EditIcon} alt="" />
              </span>
            </div>
            <div className="flex justify-between items-center ">
              <div className="flex justify-between justify-between items-center w-1/2">
                <div>Discount %</div>
                <div>10</div>
              </div>
              <span className=" cursor-pointer">
                <Image height={16} width={16} src={EditIcon} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:gap-8">
        <div className="lg:flex-[0.6] w-full">
          <div className="flex justify-between items-center">
            <span className=" text-xl font-semibold mb-3">
              Credits & Discount
            </span>
            <span className=" cursor-pointer">

            <Image height={24} width={24} src={EditIcon} alt="" />
            </span>
          </div>
          <div className=" rounded-lg shadow-shadow-tertiary p-6 bg-white mt-3">
            <div className="flex gap-2">
              <Image height={96} width={96} src={NFT1} alt="" />
              <Image height={96} width={96} src={NFT2} alt="" />
              <Image height={96} width={96} src={NFT3} alt="" />
              <Image height={96} width={96} src={NFT4} alt="" />
            </div>
          </div>
        </div>
        <div className=" hidden lg:block flex-[0.4]"></div>
      </div>
    </div>
  );
};

export default EditPage;
