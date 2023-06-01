import { PostModel } from './post-model';

export interface PostDeleteModel {
  post: PostPreviousModel;
}

export interface PostPreviousModel {
  previous: PostModel;
}
