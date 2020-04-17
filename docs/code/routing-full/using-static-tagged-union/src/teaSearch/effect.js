import { searchTeas } from "./data";

export const effect = ({ state, update }) => {
  if (state.loadSearchTeas) {
    setTimeout(() => {
      update({ searchTeas, loadSearchTeas: false });
    }, 1000);
  }
};
