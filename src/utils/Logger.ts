import fetch from 'node-fetch';
import { Constants } from './Contants';
import moment from 'moment-timezone';

export const logger = {
	info: async (info: {}) => {
		console.log(info);

		// invoke log module like winston.
	},
	error: async (error: {}) => {
		console.log(error);

		fetch(Constants.API_INFO.API_URL + '/logs', {
			method: 'POST',
			body: JSON.stringify({
				token: Constants.COMMON_INFO.TOKEN,
				month: moment().tz('Asia/Seoul').format('YYMM'),
				log: error,
			}),
		});

		// invoke log module like winston.
	},
};
