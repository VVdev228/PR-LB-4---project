// src/api/controllers/post/validatorCreate.ts
import { Request, Response, NextFunction } from 'express';
import { getRepository, ILike } from 'typeorm';

import { Post } from 'orm/entities/posts/Post';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorCreate = async (req: Request, res: Response, next: NextFunction) => {
  const errorsValidation: ErrorValidation[] = [];

  const rawTitle = req.body?.title;
  const rawContent = req.body?.content;

  const title = typeof rawTitle === 'string' ? rawTitle.trim() : '';
  const content = typeof rawContent === 'string' ? rawContent.trim() : null;

  if (!title) {
    errorsValidation.push({ title: 'Title is required' });
  }
  if (rawContent != null && typeof rawContent !== 'string') {
    errorsValidation.push({ content: 'Content must be a string' });
  }

  // (опционально) проверка уникальности title (без учёта регистра)
  if (title) {
    const repo = getRepository(Post);
    const existing = await repo.findOne({ where: { title: ILike(title) } });
    if (existing) {
      errorsValidation.push({ title: `Title '${title}' already exists` });
    }
  }

  if (errorsValidation.length) {
    return next(new CustomError(400, 'Validation', 'Create post validation error', null, null, errorsValidation));
  }

  // записываем обратно «нормализованные» значения
  req.body.title = title;
  req.body.content = content;

  return next();
};
