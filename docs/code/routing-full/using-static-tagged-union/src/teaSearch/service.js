import { fold } from "static-tagged-union";

export const service = ({ state }) =>
  fold({
    TeaSearch: () => {
      if (!state.searchTeas) {
        return { loadSearchTeas: true };
      }
    },
    _: () => {
      if (state.searchTeas) {
        return { searchTeas: undefined };
      }
    }
  })(state.route);
