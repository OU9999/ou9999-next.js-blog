export interface INotesArr {
  id?: string;
  title?: string;
  category?: string;
  createdAt?: number;
  thumbnailUrl?: string;
  description?: string;
}

export interface ICategoryArr {
  id?: string;
  category?: string;
  createdAt?: number;
}

export interface IDetail {
  category?: string;
  createdAt?: number;
  md?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}
