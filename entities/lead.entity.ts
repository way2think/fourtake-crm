export interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    country: string;
    visa_type: string;
    number_of_applicants: number;
    residence_state: string;
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
    assignee: string;
    source: string;
}
