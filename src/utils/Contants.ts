import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const API_INFO = {
	API_URL: 'https://sob19r4255.execute-api.ap-northeast-2.amazonaws.com/dev/app',
};

const COMMON_INFO = {
	TOKEN: process.env['TOKEN'],
	IMAGE_PATH: process.env['IMAGE_PATH'] || 'images/',
	ALIVE_DT: new Date().getTime() + 300000,
};

export const Constants = { API_INFO, COMMON_INFO };
