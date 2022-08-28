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
