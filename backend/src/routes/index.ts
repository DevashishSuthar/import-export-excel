import express from 'express';
const router = express.Router();

import apiV1Routes from '@/routes/api-v1';
router.use('/api/v1', apiV1Routes);

export default router;
