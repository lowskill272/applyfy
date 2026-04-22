// Общие типы между api и web

export type ApplicationStatus =
  | 'new'
  | 'sent'
  | 'viewed'
  | 'interview'
  | 'rejected'
  | 'offer'

export interface Application {
  id: string
  vacancyTitle: string
  companyName: string
  vacancyUrl: string
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
