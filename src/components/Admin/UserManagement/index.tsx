import Image from "next/image";
import React from "react";
import SearchIcon from "@public/Icons/searchIcon.svg";
import Button from "@/components/UI/Button";
import EditIcon from "@public/Icons/editIcon.svg";
import EditPage from "./EditPage";
import useWidth from "@/hooks/useWidth";

const UserManagementComp = () => {
  const [openEditSection, setOpenEditSection] = React.useState(false);
  const width = useWidth();

  return (
    <>
      {!openEditSection ? (
        <div className="w-full">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-3">
            <span className=" text-xl font-semibold">User Management</span>
            <div className="flex gap-2 w-full md:w-auto">
              <div className="flex items-center border border-[#ACB1C1] rounded h-11 overflow-hidden bg-white w-full md:w-[280px] ">
                <span className=" min-w-fit mr-2.5 ml-3">
                  <Image
                    src={SearchIcon}
                    width={16}
                    height={16}
                    alt="Filter Icon"
                  />
                </span>
                <input
                  type="text"
                  className=" border-none outline-none h-full w-full bg-transparent text-secondary-text text-sm "
                  placeholder="Name or wallet address"
                  //   onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <Button className="p-3">Search</Button>
            </div>
          </div>
          <div className=" border-0.5 border-[#ACB1C1] rounded-lg ">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b-0.5 border-[#ACB1C1]">
                  <tr>
                    <th className="text-start text-sm text-semibold w-1/4  px-4 py-3 w-[30%] ">
                      Account Name
                    </th>
                    <th className="text-start text-sm text-semibold px-4 py-3 ">
                      Wallet address
                    </th>
                    <th className="text-start text-sm text-semibold px-4 py-3 w-[15%]">
                      Subscription
                    </th>
                    <th className="w-[10%]"></th>
                  </tr>
                </thead>
                <tbody>
                  {Array.apply(null, Array(10)).map((contact, index) => {
                    return (
                      <tr key={index} className="bg-white border-b-0.5 border-[#ACB1C1] text-xs text-secondary-text font-normal ">
                        <td className="px-4 py-3">First name Last Name</td>
                        <td className="px-4 py-3">
                            {width > 768 ? "0x05f7903195f7110e318fce46973aa72adeafd0e8" : "0x05f7903195f7110e318fce46973aa72adeafd0e8"}
                          
                        </td>
                        <td className="px-4 py-3">Yes</td>
                        <td className="px-4 py-3 text-end">
                          <div
                            onClick={() => setOpenEditSection(true)}
                            className="flex justify-end cursor-pointer "
                          >
                            <Image
                              className="min-w-fit"
                              height={16}
                              width={16}
                              src={EditIcon}
                              alt=""
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center px-4 py-3">
              <Button variant="blueOutline" className="py-2 px-4 rounded-lg ">
                Previous
              </Button>
              <div>Page 1 of 10</div>
              <Button variant="blueOutline" className="py-2 px-4 rounded-lg">
                Next
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EditPage />
      )}
    </>
  );
};

export default UserManagementComp;
