export enum UserRole {
    CUSTOMER = 'customer',
    MARKETING = 'marketing',
    EXPERT = 'expert',
    ADMIN = 'admin',
    SALE = 'sale',
    USER = 'user',
}
export interface Role {
    id: string;
    description: UserRole;
}
