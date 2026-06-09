export const GRID_BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
export const GRID_COLS = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

function groupLayoutRows(layout) {
  const sorted = [...layout].sort((a, b) => a.y - b.y || a.x - b.x);
  const rowMap = new Map();

  sorted.forEach((item) => {
    if (!rowMap.has(item.y)) {
      rowMap.set(item.y, []);
    }
    rowMap.get(item.y).push(item);
  });

  return Array.from(rowMap.values()).map((row) =>
    row.sort((a, b) => a.x - b.x)
  );
}

function isWideItem(item, lgCols = 12) {
  return item.w >= Math.ceil(lgCols * 0.66);
}

function buildLayoutForCols(lgLayout, cols, lgCols = 12) {
  if (cols >= lgCols) {
    return lgLayout.map((item) => ({ ...item }));
  }

  const rows = groupLayoutRows(lgLayout);
  const result = [];
  let y = 0;

  rows.forEach((row) => {
    if (cols <= 4) {
      row.forEach((item) => {
        result.push({ i: item.i, x: 0, y, w: cols, h: item.h });
        y += item.h;
      });
      return;
    }

    let index = 0;
    while (index < row.length) {
      const item = row[index];

      if (isWideItem(item, lgCols)) {
        result.push({ i: item.i, x: 0, y, w: cols, h: item.h });
        y += item.h;
        index += 1;
        continue;
      }

      const next = row[index + 1];
      if (next && !isWideItem(next, lgCols)) {
        const leftWidth = Math.floor(cols / 2);
        const rightWidth = cols - leftWidth;
        result.push({ i: item.i, x: 0, y, w: leftWidth, h: item.h });
        result.push({ i: next.i, x: leftWidth, y, w: rightWidth, h: next.h });
        y += Math.max(item.h, next.h);
        index += 2;
        continue;
      }

      result.push({ i: item.i, x: 0, y, w: cols, h: item.h });
      y += item.h;
      index += 1;
    }
  });

  return result;
}

export function buildResponsiveLayouts(lgLayout, lgCols = 12) {
  return {
    lg: lgLayout.map((item) => ({ ...item })),
    md: buildLayoutForCols(lgLayout, GRID_COLS.md, lgCols),
    sm: buildLayoutForCols(lgLayout, GRID_COLS.sm, lgCols),
    xs: buildLayoutForCols(lgLayout, GRID_COLS.xs, lgCols),
    xxs: buildLayoutForCols(lgLayout, GRID_COLS.xxs, lgCols),
  };
}
