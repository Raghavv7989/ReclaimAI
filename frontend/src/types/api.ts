export interface ApiResponse<T> {
  data: T | null;
  meta: ApiMeta | null;
  errors: ApiError[] | null;
}

export interface ApiMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ApiError {
  code: string;
  message: string;
  field: string | null;
  details: Record<string, unknown> | null;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}
