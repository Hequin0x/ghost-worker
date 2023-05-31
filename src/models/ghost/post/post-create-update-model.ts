import { PostModel } from './post-model';

export interface PostCreateUpdateModel {
  post: PostCurrentModel;
}

export interface PostCurrentModel {
  current: PostModel;
}
