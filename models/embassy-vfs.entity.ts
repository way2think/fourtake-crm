export interface EmbassyVfs {
    id?: number;
    type: string;
    country: string;
    name: string;
    jurisdiction?: string[];
    address?: string;
    state?: string;
    city?: string;
    phone?: string;
    fax?: string;
    email?: string;
    submission_details?: string;
    collection_details?: string;
    processing_time?: string;
}
