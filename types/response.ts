export interface PerfumeListResponseData {
  p_id: number;
  p_name: string;
  imgurl: string;
  brand_list: { b_name: string; b_id: number };
}

export interface FilteredPerfumeListResponseData {
  perfume_list: PerfumeDetailResponseData;
}

export interface PerfumeDetailResponseData extends PerfumeListResponseData {
  perfume_note_list: {
    n_id: number;
    n_type: string;
    note_list: {
      n_id: string;
      n_name: string;
    };
  }[];
}

export interface FragranceNoteListResponseData {
  f_id: number;
  n_id: number;
  n_name: string;
}

export interface NoteListResponseData {
  n_id: number;
  n_name: string;
  f_id: number;
}

export interface BrandListResponseData {
  b_id: number;
  b_name: string;
}

export interface AdminPerfumeDetailResponseData extends Omit<PerfumeListResponseData, 'brand_list'> {
  b_id: number;
  perfume_note_list: {
    p_n_id: number;
    n_id: number;
    n_type: string;
  }[];
}
