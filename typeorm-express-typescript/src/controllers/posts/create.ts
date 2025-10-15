import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  const { title, content } = req.body;

  if (!title || !content) {
    const customError = new CustomError(400, 'Validation', 'Title and content are required.');
    return next(customError);
  }

  try {
    const newPost = postRepository.create({ title, content });
    await postRepository.save(newPost);

    res.customSuccess(201, 'Post created successfully.', newPost);
  } catch (err) {
    const customError = new CustomError(500, 'Raw', 'Failed to create post.', null, err);
    return next(customError);
  }
};
