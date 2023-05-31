import { PostModel } from './post-model';

export interface PostUpdatedModel {
  post: PostCurrentModel;
}

export interface PostCurrentModel {
  current: PostModel;
}
