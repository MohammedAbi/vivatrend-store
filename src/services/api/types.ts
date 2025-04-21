// Base API types
export interface ApiErrorResponse {
  errors: Array<{ message: string }>;
  status: string;
  statusCode: number;
}

export interface PaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}
