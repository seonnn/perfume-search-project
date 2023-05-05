export interface PerfumeListResponseData {
  p_id: number;
  p_name: string;
  imgurl: string;
  brand_list: { b_name: string };
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
