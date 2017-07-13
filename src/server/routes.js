import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
  res.send({ message: 'Hello World!' });
});

export default router;
