import fetch from '@/config/fetch'

/**
 * 列表
 */
export const logisticsList = data => fetch('/logistics/getLogisticsConversion', data, 'POST', 'fetch');

/**
 * 登陆
 */
export const login = data => fetch('/login', data, 'POST', 'fetch');
