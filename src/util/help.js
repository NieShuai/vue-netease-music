/* eslint-disable */

// 将秒转换成分:秒
export function formatTime(seconds) {
  return [
    parseInt((seconds / 60) % 60, 10),
    parseInt(seconds % 60, 10),
  ].join(':').replace(/\b(\d)\b/g, '0$1');
}

// 获取范围内随机数
export function getRandom(n, m) {
  const c = m - n + 1;	
	return Math.floor(Math.random() * c + n);
}
