import { logger } from './Logger';

export class AppError extends Error {
	errCode?: number;
	responseCode?: number;
	isProgrammerErr?: boolean;
	logging?: boolean;

	constructor(
		name: string,
		message: string,
		stack: string,
		errDetail: { errCode?: number; responseCode?: number; isProgrammerErr?: boolean; logging?: boolean } = {},
	) {
		super();
		this.name = name;
		this.message = message;
		this.stack = stack;
		this.responseCode = errDetail.responseCode;
		this.errCode = errDetail.errCode;
		this.isProgrammerErr = errDetail.isProgrammerErr;
		this.logging = typeof errDetail.logging === 'boolean' ? errDetail.logging : true;

		this.doAfterErr();
	}

	doAfterErr = () => {
		logger.error({
			e: this.name + ': ' + this.message,
			message: ' ',
			errCode: this.errCode,
			responseCode: this.responseCode,
			isProgrammerErr: this.isProgrammerErr,
		});
	};
}
