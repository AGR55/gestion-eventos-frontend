export interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  active: boolean;
}

export interface EventFormValues {
  title: string;
  description: string;
  categoryId: string;
  date: string;
  time: string;
  address: string;
  duration: number;
  limitParticipants: number;
  requireAcceptance: boolean;
  isPublished: boolean;
}

export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  duration: number;
  requireAcceptance: boolean;
  limitParticipants: number;
  isPublished: boolean;
  address: string;
  categoryId: string;
  organizerId: string;
  image?: File;
}

export interface CreateEventResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  active: boolean;
  title: string;
  description: string;
  imageUrl?: string;
  address: string;
  date: string;
  duration: number;
  isPublished: boolean;
  requireAcceptance: boolean;
  limitParticipants: number;
  price: number;
  organizer: {
    id: string;
    userName: string;
    email: string;
    balance: number;
  };
  category: Category;
}

// Asegurar que los tipos permitan valores opcionales/null
export interface Event {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  active: boolean;
  title: string;
  description: string;
  imageUrl: string | null;
  address: string;
  date: string;
  duration: number;
  isPublished: boolean;
  requireAcceptance: boolean;
  limitParticipants: number;
  price: number;
  organizer: {
    id: string;
    userName: string;
    email: string;
    balance: number;
  } | null;
  category: {
    id: string;
    name: string;
    active: boolean;
  } | null;
}

// ✨ Tipo para la respuesta personalizada del servidor
export interface CustomEventResponse {
  events: {
    data: Event[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
  featuredEvents?: Event[];
  status: string;
}

export interface EventFilters {
  categoryId?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
  priceMin?: number;
  priceMax?: number;
  isPublished?: boolean;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export interface PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: T[];
  hasPrevious: boolean;
  hasNext: boolean;
}

export type EventsResponse = PaginatedResponse<Event>;
