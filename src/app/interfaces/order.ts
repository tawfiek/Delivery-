export interface Order {
    id?: string,
    details: string,
    addressFrom: string,
    addressTo: string,
    createdAt: Date,
    deliveredAt?: Date,
    createdBy: string,
    deliveredBy?: string
}
