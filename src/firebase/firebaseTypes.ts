export interface INote {
  id?: string;
  title?: string;
  category?: string;
  createdAt?: number;
  thumbnailUrl?: string;
  description?: string;
}

export interface ICategory {
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

export interface IComment {
  docId?: string;
  nickname?: string;
  password?: string;
  avatar?: string;
  comment?: string;
  createdAt?: number;
  edited?: boolean;
  id?: string;
}

export interface IReplyComment {
  commentId?: string;
  nickname?: string;
  password?: string;
  avatar?: string;
  comment?: string;
  createdAt?: number;
  edited?: boolean;
  id?: string;
}

export interface IGuestBookComment {
  nickname?: string;
  password?: string;
  avatar?: string;
  comment?: string;
  createdAt?: number;
  edited?: boolean;
  userIconPic?: string;
  guestBookImg?: string;
  id?: string;
}
