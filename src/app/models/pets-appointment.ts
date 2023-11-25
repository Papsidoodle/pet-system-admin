import { Timestamp } from 'firebase/firestore';

// Pinagsama ko na ung Deworm, Vaccination, Medication, Tinatamad ako gawin isa isa sa db XD

export interface PetsAppointment {
  type: number;
  petId: number;
  brand: string;
  date: Timestamp;
  expiry: Timestamp;
  for: string;
  weight: number;
  veterinarian: string;
}
