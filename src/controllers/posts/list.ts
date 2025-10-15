import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  try {
    const posts = await postRepository.find({
      select: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
    });
    res.customSuccess(200, 'List of posts.', posts);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of posts.`, null, err);
    return next(customError);
  }
};
