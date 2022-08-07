import React from "react";
import { NtfMeta } from "../../../../types/nft";
import NftItem from "../Item";

/* eslint-disable @next/next/no-img-element */
interface NftListProps {
    nfts: Array<NtfMeta>;
};

const NftList = ({ nfts }: NftListProps) => {
    return (
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {nfts.map((nft) => {
                return (<div key={nft.image} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <NftItem item={nft} />
                </div>);
            })}

        </div>
    );
}

export default NftList;