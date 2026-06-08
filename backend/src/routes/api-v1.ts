import express from 'express';
const router = express.Router();

import fileRoutes from '@/routes/api/file';
router.use('/files', fileRoutes);

export default router;
