export interface Iitems {
    id: number;
    name: string;
    sellingPrice: number;
    buyingPrice: number;
    availableAmount: number;
    companyId: number;
    company: {
      id: number;
      name: string;
    };
    unit: {
      id: number;
      name: string;
    };
    type: {
      id: number;
      name: string;
    };
    typeId: number;
    unitId: number;
    notes: string;


}

