export interface Lead {
    id?: number;
    updated_time?: string;
    name: string;
    email: string;
    phone: string;
    other_phone: string;
    country: string;
    visa_type: string;
    number_of_applicants: number;
    state_of_residence: string;
    create_date: string; // $date-time
    email_sent_date: string; // $date-time
    last_followup: string; // $date-time
    next_followup: string; // $date-time
    followup_time: string;
    followup_remark: string;
    interaction: string;
    stage: string;
    status: string;
    travel_date: string; // $date-time
    doc_pickup_date: string; // $date-time
    doc_pickup_remark: string;
    lead_note: string;
    lead_type: string;
    assigned_to: string;
    source: string;
    service_type: string;
}
