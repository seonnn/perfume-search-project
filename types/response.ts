export interface PerfumeListResponseData {
  p_id: number;
  p_name: string;
  imgurl: string;
  brand_list: { b_name: string };
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

export interface NoteListResponseData {
  f_id: number;
  note_list: {
    n_id: number;
    n_name: string;
  }[];
}

export interface BrandListResponseData {
  b_id: number;
  b_name: string;
}
