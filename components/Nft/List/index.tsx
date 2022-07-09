import NftItem from "../Item";

/* eslint-disable @next/next/no-img-element */
const NftList = () => {
    return (
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <NftItem />
            </div>
        </div>
    );
}

export default NftList;