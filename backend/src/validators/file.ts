import { z } from 'zod';

import { GENERATED_FILE_TYPES } from '@/constants/global';

const convertJsonToExcelFileSchema = z.object({
  generatedFileType: z.enum(
    Object.values(GENERATED_FILE_TYPES) as [string, ...string[]]
  ),
});

export { 
    convertJsonToExcelFileSchema 
};