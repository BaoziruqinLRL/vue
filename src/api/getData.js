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
