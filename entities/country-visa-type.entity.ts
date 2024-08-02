import { Country } from './country.entity';
import { VisaType } from './visa-type.entity';

export interface CountryVisaType {
    id: number;
    country: Country;
    visa_type: VisaType[];
}
