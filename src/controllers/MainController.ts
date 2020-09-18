import Koa from 'koa';
import { HistoryService, ScheduleService, WatchService } from '../services';
import { Constants } from '../utils';
import moment from 'moment-timezone';
import isOnline from 'is-online';

const getMain = async (ctx: Koa.Context) => {
	let isConnected = await isOnline({ timeout: 2000 });

	if (!isConnected) {
		return await ctx.render('/pages/main', {
			isConnected,
			chartDailyLabel: [],
			chartDailyDataList: [],
			chartTwoWeeksLabel: [],
			chartTwoWeeksDataList: [],
		});
	}

	let historyList = await HistoryService.getHistoryList(false, true);

	let chartDailyDataMap = {};
	let chartTwoWeeksDataMap = {};
	let nowDt = moment().tz('Asia/Seoul');
	// init DataMaps
	for (let i = 0; i < 24; i++) {
		if (i < 14) {
			chartTwoWeeksDataMap[moment(nowDt.diff(86400000 * (13 - i))).format('MMDD')] = 0;
		}
		chartDailyDataMap[i] = 0;
	}
	let chartDailyDataMapKeys = Object.keys(chartDailyDataMap);
	let chartTwoWeeksDataMapKeys = Object.keys(chartTwoWeeksDataMap);

	// set today, within two weeks data
	let nowDtStr = nowDt.format('YYMMDD') + '000000000';
	let twoWeeksAgoDtStr = moment(nowDt.diff(86400000 * 13)).format('MMDD');
	for (let i = 0; i < historyList.length; i++) {
		if (nowDtStr < historyList[i].inDt) {
			let hour = Number(historyList[i].inDt.slice(6, 8));
			chartDailyDataMap[hour]++;
		}

		let date = historyList[i].inDt.slice(2, 6);
		if (twoWeeksAgoDtStr < date) {
			chartTwoWeeksDataMap[date]++;
		}
	}

	// convert map to list
	let chartDailyDataList = [];
	let chartTwoWeeksDataList = [];
	for (let i = 0; i < 24; i++) {
		if (i < 14) {
			chartTwoWeeksDataList.push(chartTwoWeeksDataMap[moment(nowDt.diff(86400000 * (13 - i))).format('MMDD')]);
		}
		chartDailyDataList.push(chartDailyDataMap[i]);
	}

	let watchResult = true;
	if (!ScheduleService.scheduleJob) {
		ScheduleService.createScheduleJob();
	}

	if (!WatchService.watchJob) {
		watchResult = WatchService.createWatchJob();
	}

	return await ctx.render('/pages/main', {
		isConnected,
		chartDailyLabel: chartDailyDataMapKeys || [],
		chartDailyDataList: chartDailyDataList || [],
		chartTwoWeeksLabel: chartTwoWeeksDataMapKeys || [],
		chartTwoWeeksDataList: chartTwoWeeksDataList || [],
		watchResult,
	});
};

const postAliveDt = async (ctx: Koa.Context) => {
	Constants.COMMON_INFO.ALIVE_DT = new Date().getTime() + 300000;
	ctx.status = 200;
	ctx.body = { msg: 'OK' };
};

export const MainController = { getMain, postAliveDt };
