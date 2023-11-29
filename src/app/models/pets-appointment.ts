
// Pinagsama ko na ung Deworm, Vaccination, Medication, Tinatamad ako gawin isa isa sa db XD
// edi wow XD

export interface PetsAppointment {
  appointmentType?: number;
  appointmentDate?: any;
  vetName?: string;
  weight?: number;
  brandImg?: string;
  petId?: string;
  appointmentId?: string;
}

export interface PetMedicalHistory {
  medicalHistoryDate?: any;
  medicalHistory?: string;
  doctorsNote?: string;
  petId?: string;
  medicalHistoryId?: string;
}