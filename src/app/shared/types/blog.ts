export interface Post {
  _id: string;
  title: string;
  subTitle: string;
  body: string;
  createdAt: string;
  slug: string;
}

export interface PostForm {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  content: string;
}

export interface PostResponse {
  data: Post;
  message: string;
}
