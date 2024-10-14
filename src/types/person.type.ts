export interface Person {
  personType: 'PF' | 'PJ';
  document: string;
  doc_responsible?: string | undefined;
  name: string;
  cellphone?: string | undefined;
  phone?: string | undefined;
  email: string;
  address_zip: string;
  address_street: string;
  address_number: string;
  address_complement?: string | undefined;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
}

