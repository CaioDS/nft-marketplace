export type NtfMeta = {
    description: string;
    image: string;
    name: string;
    attributes: Array<NftAttributes>;
}

export type NftAttributes = {
    trait_type: "attack" | "health" | "speed";
    value: string;
}

export type Trait = "attack" | "health" | "speed";