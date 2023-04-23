export interface Fragrance {
  f_id: number;
  f_name: string;
}

export interface Note {
  n_id: number;
  n_name: string;
  f_id: number;
}

export interface Brand {
  b_id: number;
  b_name: string;
}
