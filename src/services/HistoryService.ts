import fetch from 'node-fetch';
import { AppError, Constants } from '../utils';

const getHistoryList = async (isDaily: boolean = true, isMonthly: boolean = false) => {
	try {
		let result = await fetch(
			Constants.API_INFO.API_URL +
				'/histories/' +
				Constants.COMMON_INFO.TOKEN +
				'?' +
				'isDaily=' +
				isDaily +
				'&isMonthly' +
				isMonthly,
		);

		let resultJson = await result.json();

		return resultJson.data;
	} catch (err) {
		new AppError('SgeyMyHistoryList', err.message, err.stack);
		return [];
	}
};

export const HistoryService = { getHistoryList };
