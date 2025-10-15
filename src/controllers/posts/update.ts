import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const postRepository = getRepository(Post);
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const post = await postRepository.findOne(id);

    if (!post) {
      const customError = new CustomError(404, 'General', `Post with id:${id} not found.`, ['Post not found.']);
      return next(customError);
    }

    // Оновлюємо поля поста
    post.title = title;
    post.content = content;

    await postRepository.save(post);

    res.customSuccess(200, 'Post updated successfully.', post);
  } catch (err) {
    return next(new CustomError(500, 'Raw', 'Failed to update post.', null, err));
  }
};
