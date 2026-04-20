export type Service = 'lllt' | 'prp' | 'microneedling' | 'supplements' | 'bundle'

export interface BookingFormData {
  // Step 1
  postcode: string
  // Step 2
  service: Service
  // Step 3
  appointment_date: string
  appointment_time: string
  // Step 4
  first_name: string
  last_name: string
  email: string
  phone: string
  address_line1: string
  address_line2: string
  city: string
  notes: string
}

export const SERVICES = [
  {
    id: 'lllt' as Service,
    name: 'LLLT Therapy',
    description: '670nm red light therapy to stimulate dormant follicles',
    duration: '60 min',
    price: '£120',
  },
  {
    id: 'prp' as Service,
    name: 'PRP Therapy',
    description: 'Platelet-rich plasma reactivates your own hair follicles',
    duration: '75 min',
    price: '£250',
  },
  {
    id: 'microneedling' as Service,
    name: 'Scalp Microneedling',
    description: 'Micro-channels enhance absorption of growth factors',
    duration: '60 min',
    price: '£180',
  },
  {
    id: 'supplements' as Service,
    name: 'Supplement Consultation',
    description: 'Clinician-curated supplement plan tailored to your needs',
    duration: '45 min',
    price: '£80',
  },
  {
    id: 'bundle' as Service,
    name: 'Full Assessment Bundle',
    description: 'Scalp scan, personalised plan and first LLLT treatment',
    duration: '90 min',
    price: '£180',
  },
]

export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00',
]
