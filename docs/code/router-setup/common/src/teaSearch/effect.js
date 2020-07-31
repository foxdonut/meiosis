import { searchTeas } from "./data";

export const Effect = update => state => {
  if (state.loadSearchTeas) {
    setTimeout(() => {
      update({ searchTeas, loadSearchTeas: false });
    }, 1000);
  }
};
