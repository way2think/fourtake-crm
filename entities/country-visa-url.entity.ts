import { Country } from './country.entity';

export interface CountryVisaUrl {
    id?: number;
    country: Country | null;
    url: string;
}
