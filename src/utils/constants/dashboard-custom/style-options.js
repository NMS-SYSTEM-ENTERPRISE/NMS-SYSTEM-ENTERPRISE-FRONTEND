import { CHART_STYLES } from './chart-styles';
import { GRID_STYLES } from './grid-styles';
import { HEAT_MAP_STYLES } from './heat-map-styles';
import { MAP_STYLES } from './map-styles';
import { PIE_STYLES } from './pie-styles';
import { SUNBURST_STYLES } from './sunburst-styles';
import { THEME_RIVER_STYLES } from './theme-river-styles';
import { TOP_N_STYLES } from './top-n-styles';
import { TREE_MAP_STYLES } from './tree-map-styles';

export const getStyleOptionsForTab = (activeTab) => {
  switch (activeTab) {
    case 'Chart':
      return CHART_STYLES;
    case 'Top N':
      return TOP_N_STYLES;
    case 'Grid':
      return GRID_STYLES;
    case 'Map':
      return MAP_STYLES;
    case 'Heat Map':
      return HEAT_MAP_STYLES;
    case 'Tree Map':
      return TREE_MAP_STYLES;
    case 'Pie':
      return PIE_STYLES;
    case 'ThemeRiver':
      return THEME_RIVER_STYLES;
    case 'Sunburst':
      return SUNBURST_STYLES;
    default:
      return CHART_STYLES;
  }
};
