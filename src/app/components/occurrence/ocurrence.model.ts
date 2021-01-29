export interface Occurrence {
    id: number;
    description: string,
    date: string,
    vehiclePlate: string,
    repaired?: boolean,
    repairDate?: string,
    repairValue?: number;
}
