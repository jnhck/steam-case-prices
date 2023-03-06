export type CaseBasics = {
    name: string;
    img: string;
}

export type Case = CaseBasics & {
    price_gross: number;
    volume: number;
    timestamp: number;
}
