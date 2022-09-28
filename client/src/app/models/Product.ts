export interface Product { // ห้ามใส่ตัวนำหน้าตัวใหญ่
    id:              number;
    name:            string;
    description:     string;
    price:           number;
    pictureUrl:      string;
    type?:           string;
    brand:           string;
    quantityInStock?:number;
}

export interface ProductParams {
    orderBy: string;
    searchTerm?: string;
    types: string[];
    brands: string[];
    pageNumber: number;
    pageSize: number;
}
