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

// 歌词同步部分    
export function parseLyric(text) {
  const lines = text.split('\n');
  const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;
  const result = [];
  lines.forEach((line) => {
    const checked = timeExp.exec(line);
    if (checked) {
      const txt = line.replace(timeExp, '').trim();
      if (txt) {
        result.push({
          time: checked[1] * 60 * 1000 + checked[2] * 1000 + (checked[3] || 0) * 10,
          txt,
        });
      }
    }
  });
  result.sort(function (a, b) {
    return a.time - b.time;
  });
  return result;
}
