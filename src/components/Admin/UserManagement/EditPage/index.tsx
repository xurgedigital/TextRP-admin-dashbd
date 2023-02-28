import Image from "next/image";
import React from "react";
import EditIcon from "@public/Icons/editIcon.svg";
import Switch from "react-switch";
import NFT1 from "@public/Images/nft/img1.svg";
import NFT2 from "@public/Images/nft/img2.svg";
import NFT3 from "@public/Images/nft/img3.svg";
import NFT4 from "@public/Images/nft/img4.svg";
import useWidth from "@/hooks/useWidth";
import Button from "@/components/UI/Button";


const EditPage = () => {
  const [active, setActive] = React.useState(false);
  const [isEditingUser, setIsEditingUser] = React.useState(false);
  const [isEditingCredit, setIsEditingCredit] = React.useState(false);
  const [isEditingDiscount, setIsEditingDiscount] = React.useState(false);
  const [isEditingNFT, setisEditingNFT] = React.useState(false);

  const width = useWidth();

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:flex-[0.6]">
          <span className=" text-xl font-semibold mb-3">Edit User</span>
          <div className=" rounded-lg shadow-shadow-tertiary p-6 mt-3 bg-white">
            <div className="text-sm text-primary-text font-normal ">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
                <div className="flex-[0.4]">Account Name</div>
                {!isEditingUser ? (
                  <div className="flex flex-[0.6] justify-between items-center">
                    <div className="">First name Last Name</div>
                    <span
                      onClick={() => setIsEditingUser(true)}
                      className=" cursor-pointer"
                    >
                      <Image height={16} width={16} src={EditIcon} alt="" />
                    </span>
                  </div>
                ) : (
                  <div className="flex-[0.6]">
                    <input
                      className=" bg-[#F3F5FF] h-11 rounded-lg w-full p-3 outline-none border-0.5 border-[#ACB1C1] "
                      type="text"
                    />
                    <div className=" inline-flex gap-2 mt-2">
                      <Button className="px-6 py-2 rounded">Save</Button>
                      <Button
                        onClick={() => setIsEditingUser(false)}
                        variant="blueOutline"
                        className="px-6 py-2 rounded"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Wallet Address</div>
                <div className="flex-[0.6]">
                  {width > 1250
                    ? "0x05f7903195f7110e318fce46973aa72adeafd0e8"
                    : "0x05f79...d0e8"}
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Subscription</div>
                <div className="flex-[0.6]">Active</div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Subscription Plan</div>
                <div className="flex-[0.6]">Monthly</div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Subscription Start Date</div>
                <div className="flex-[0.6]">25 Jan 2023, 01:00 PM</div>
              </div>
              <div className="flex gap-3 mb-4">
                <div className="flex-[0.4]">Account Creation Date</div>
                <div className="flex-[0.6]">25 Jan 2023, 01:00 PM</div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-[0.4]">Active</div>
                <div className="flex-[0.6]">
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
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-4">
              <div className="flex-[0.3]">Credits Balance</div>
              {!isEditingCredit ? (
                <div className="flex justify-between justify-between items-center gap-2 md:w-1/2">
                  <div>25</div>
                  <span
                    onClick={() => setIsEditingCredit(true)}
                    className=" cursor-pointer"
                  >
                    <Image height={16} width={16} src={EditIcon} alt="" />
                  </span>
                </div>
              ) : (
                <div className="flex-[0.6]">
                  <input
                    className=" bg-[#F3F5FF] h-11 rounded-lg w-full p-3 outline-none border-0.5 border-[#ACB1C1] "
                    type="text"
                  />
                  <div className=" inline-flex gap-2 mt-2">
                    <Button className="px-6 py-2 rounded">Save</Button>
                    <Button
                      onClick={() => setIsEditingCredit(false)}
                      variant="blueOutline"
                      className="px-6 py-2 rounded"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 ">
              <div className="flex-[0.3]">Discount %</div>
              {!isEditingDiscount ? (
                <div className="flex justify-between justify-between items-center gap-2 md:w-1/2">
                  <div>10</div>
                  <span
                    onClick={() => setIsEditingDiscount(true)}
                    className=" cursor-pointer"
                  >
                    <Image height={16} width={16} src={EditIcon} alt="" />
                  </span>
                </div>
              ) : (
                <div className="flex-[0.6]">
                  <input
                    className=" bg-[#F3F5FF] h-11 rounded-lg w-full p-3 outline-none border-0.5 border-[#ACB1C1] "
                    type="text"
                  />
                  <div className=" inline-flex gap-2 mt-2">
                    <Button className="px-6 py-2 rounded">Save</Button>
                    <Button
                      onClick={() => setIsEditingDiscount(false)}
                      variant="blueOutline"
                      className="px-6 py-2 rounded"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:gap-8">
        <div className="lg:flex-[0.6] w-full">
          <div className="flex justify-between items-center">
            <span className=" text-xl font-semibold mb-3">Assigned NFTs</span>
            {!isEditingNFT && (
              <span
                onClick={() => setisEditingNFT(true)}
                className=" cursor-pointer"
              >
                <Image height={24} width={24} src={EditIcon} alt="" />
              </span>
            )}
          </div>
          <div className=" rounded-lg shadow-shadow-tertiary p-6 bg-white mt-3">
            <div className="flex flex-wrap gap-2">
              <span className="relative">
                <Image height={96} width={96} src={NFT1} alt="" />
                {isEditingNFT && (
                  <input className="absolute top-1 left-1" type="checkbox" />
                )}
              </span>
              <span className="relative">
                <Image height={96} width={96} src={NFT2} alt="" />
                {isEditingNFT && (
                  <input className="absolute top-1 left-1" type="checkbox" />
                )}
              </span>
              <span className="relative">
                <Image height={96} width={96} src={NFT3} alt="" />
                {isEditingNFT && (
                  <input className="absolute top-1 left-1" type="checkbox" />
                )}
              </span>
              <span className="relative">
                <Image height={96} width={96} src={NFT4} alt="" />
                {isEditingNFT && (
                  <input className="absolute top-1 left-1" type="checkbox" />
                )}
              </span>
            </div>
            {isEditingNFT && (
              <div className=" inline-flex gap-2 mt-4">
                <Button className="px-6 py-2 rounded">Save</Button>
                <Button
                  onClick={() => setisEditingNFT(false)}
                  variant="blueOutline"
                  className="px-6 py-2 rounded"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className=" hidden lg:block flex-[0.4]"></div>
      </div>
    </div>
  );
};

export default EditPage;
