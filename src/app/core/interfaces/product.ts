import { ProductCategory } from "./product-category";

export enum ProductType {
    REGULAR = "REGULAR",
    IFOOD = "IFOOD",
}

export interface ProductOption {
    id?: number;
    name: string;
    description: string;
    externalCode: string;
    imagePath: string;
    price: number;
    ean: string;
}

export interface ProductOptionGroup {
    id?: number;
    name: string;
    externalCode: string;
    status: string;
    minOptions: number;
    maxOptions: number;
    index: number;
    options: ProductOption[];
}



export interface Product {
    id?: number;
    name: string;
    description: string;
    additionalInformation?: string;
    serving?: string;
    dietaryRestrictions?: string[];
    weightQuantity: number;
    weightUnit: string;
    volume: number;
    price: number;
    productType: ProductType;

    image?: string;
    multipleImages?: string[];

    // category?: ProductCategory;
    // optionGroups?: ProductOptionGroup[];
}


export interface ProductSearchParams {
    id?: number;
    name?: string;
    description?: string;
    additionalInformation?: string;
    serving?: string;
    weightQuantity?: number;
    weightUnit?: string;
    volume?: number;
    price?: number;
    productType?: ProductType;
}