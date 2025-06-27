import {InventoryStats} from "@/services/products/types";

export interface ApiResponse {
    status: boolean;
    message: string;
    data: InventoryStats;
}