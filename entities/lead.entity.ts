export interface Lead {
    id?: any;
    updated_time?: string;
    name: string;
    email: string;
    phone: string;
    other_phone: string;
    destination_country: string;
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
    date_range: Date;
    location: string;
    attestation_document: any;
    attestation_service_type: any;
    passport_service_type: string;
    passport_service_category: string;
    passport_size: string;
    currency_exchange_from: string;
    currency_volume: string;
    valid_visa: string;
    exchange_mode: string;
    commission_earned: string;
    insurance_plan: string;
    trip_type: string;
    ped: string;
    travellers_count: string;
    eldest_age: string;
    sum_insured: string;
    other_details: string;
}
