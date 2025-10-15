import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  const { id } = req.params; // получаем ID поста из URL

  try {
    const post = await postRepository.findOne({ where: { id } });

    if (!post) {
      const customError = new CustomError(404, 'General', 'Not Found', [`Post with id:${id} doesn't exist.`]);
      return next(customError);
    }

    await postRepository.remove(post);

    return res.customSuccess(200, 'Post deleted successfully.');
  } catch (err) {
    return next(new CustomError(500, 'General', 'Failed to delete post.', null, err));
  }
};
