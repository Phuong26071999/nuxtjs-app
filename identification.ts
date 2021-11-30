export interface ProductList {
    id: number;
    title: string;
    quantity: number;
    isFreeShip: boolean;
    isNew: boolean;
    isSale: boolean;
    salePercent: number;
    price: number;
    type: string;
    img: string;
}