import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const show = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const postRepository = getRepository(Post);

  try {
    const post = await postRepository.findOne(id);

    if (!post) {
      const customError = new CustomError(404, 'Raw', `Post with id ${id} not found.`, null);
      return next(customError);
    }

    res.customSuccess(200, 'Post found.', post);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve post with id ${id}.`, null, err);
    return next(customError);
  }
};
