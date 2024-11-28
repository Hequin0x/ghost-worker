import { PostModel } from './post-model';

export interface PostPublishUpdateModel {
  post: PostCurrentModel;
}

export interface PostCurrentModel {
  current: PostModel;
}
