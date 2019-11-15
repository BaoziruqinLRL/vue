import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/login', data, 'POST', 'fetch');

/**
 * 获取成员列表
 */
export const getMembers = data => fetch('/user-base/members', data, 'GET', '');

/**
 * 获取菜单栏
 */
export const getMenus = data => fetch('/user-base/menus', data, 'GET', '');

/**
 * 获取成员基础信息
 */
export const getMemberBaseInfo = data => fetch('/member/base-info', data, 'GET', '');

/**
 * 获取任务列表
 */
export const getEmailJobList = data => fetch('/email-job/list', data, 'POST', 'fetch');

/**
 * 创建任务
 */
export const saveJob = data => fetch('/email-job/create', data, 'POST', 'fetch');

/**
 * 删除任务
 */
export const deleteJob = data => fetch('/email-job/delete', data, 'GET', '');

/**
 * 创建任务规则
 */
export const saveJobRule = data => fetch('/email-job/rule/create', data, 'POST', 'fetch');

/**
 * 删除任务规则
 */
export const deleteJobRule = data => fetch('/email-job/rule/delete', data, 'POST', 'fetch');

/**
 * 获取jk列表
 */
export const getJkList = data => fetch('/jk/list', data, 'POST', 'fetch');

/**
 * 创建jk
 */
export const saveJk = data => fetch('/jk/save', data, 'POST', 'fetch');

