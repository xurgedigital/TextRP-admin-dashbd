import { useState } from "react";
import Img1 from "@public/Images/nft/img1.svg";
import Image from "next/image";

const NFTsComp = () => {
  const [NftData, setNftData] = useState([1,2,3,4]);
  return (
    <div className="w-full">
      <p className="text-xl sm:text-2xl font-semibold mb-3">NFTs</p>
      <div className="w-full bg-white p-6 overflow-auto">
        <table className="table-fixed w-full border-separate min-w-[800px] border-spacing-4">
          <thead>
            <tr className="text-sm font-semibold">
              <th className="min-w-[7rem] text-left mb-4">
                {" "}
                <div>NFT Image</div>
              </th>
              <th className="min-w-[7rem] text-left mb-4">
                {" "}
                <div>NFT Title</div>
              </th>
              <th className="min-w-[19rem] text-left mb-4" colSpan={2}>
                {" "}
                <div>NFT Description</div>
              </th>
              <th className="min-w-[7rem] text-left mb-4">
                {" "}
                <div>Address</div>
              </th>
              <th className="min-w-[7rem] text-left mb-4">
                {" "}
                <div>Taxon</div>
              </th>
              <th className="min-w-[7rem] text-left mb-4">
                {" "}
                <div>Remaining Count</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {NftData && NftData?.length > 0 ? (
              NftData?.map((ci, i) => (
                <tr key={i} className="text-sm font-normal">
                  <td>
                    <Image
                        src={Img1}
                        alt="arrow-left"
                        className="cursor-pointer object-cover h-24 w-24"
                        quality={100}
                    />
                  </td>
                  <td>NFT title goes here</td>
                  <td colSpan={2}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam finibus odio lectus, eu mattis nulla laoreet id.
                    Phasellus imperdiet erat risus, sed sagittis justo blandit.
                  </td>
                  <td className="break-all text-secondary-text">0x05f7903195f7110e318fce46973aa72adeafd0e8</td>
                  <td className="break-all text-secondary-text">0x05f7903195f7110e318fce46973aa72adeafd0e8</td>
                  <td className="text-secondary-text">1000</td>
                </tr>
              ))
            ) : (
              <tr className="w-full">
                <td colSpan={4} className="w-full">
                  <div className="text-base font-medium w-full text-center p-8">
                    Loading...
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NFTsComp;
