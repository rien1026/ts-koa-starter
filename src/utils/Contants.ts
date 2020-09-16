import * as dotenv from 'dotenv';
import fs from 'fs';

if (!fs.existsSync('.env')) {
	fs.writeFileSync('.env', 'TOKEN=' + '\nIMAGE_PATH=' + 'images/');
}

dotenv.config({ path: '.env' });

const API_INFO = {
	API_URL: 'https://sob19r4255.execute-api.ap-northeast-2.amazonaws.com/dev/app',
};

const COMMON_INFO = {
	TOKEN: process.env['TOKEN'],
	IMAGE_PATH: process.env['IMAGE_PATH'],
	ALIVE_DT: new Date().getTime() + 300000,
};

export const Constants = { API_INFO, COMMON_INFO };
