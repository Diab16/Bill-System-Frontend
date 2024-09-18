export interface IType {
  typeId: number;
  typeName: string;    // corresponds to TypeName in your DTO
  typeNotes?: string;  // corresponds to TypeNotes in your DTO (optional)
  companyName: string; // corresponds to CompanyName in your DTO
}
