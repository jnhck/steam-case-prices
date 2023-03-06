const netPrice = (price: number): string => {
    return (price / 1.15 - 0.01).toFixed(2);
}

const euroPrice = (price: string): string => {
    return price.replace(".", ",") + "€";
}

export const euroNetPrice = (price: number): string => {
    return euroPrice(netPrice(price));
}