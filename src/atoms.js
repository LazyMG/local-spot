import { atom, selector } from "recoil";
import { newLocalData } from "./utils/tempData";

export const placeState = atom({
  key: "placeState",
  default: newLocalData,
});

export const filterState = atom({
  key: "filterState",
  default: {
    local: [],
    menu: [],
    time: [],
  },
});

export const isFilteredState = selector({
  key: "isFilteredState",
  get: ({ get }) => {
    const { local, menu, time } = get(filterState);

    if (local.length === 0 && menu.length === 0 && time.length === 0)
      return false;
    else return true;
  },
});

export const filteredPlacesState = selector({
  key: "filteredPlaceState",
  get: ({ get }) => {
    const places = get(placeState);
    const isFiltered = get(isFilteredState);
    const { local, menu, time } = get(filterState);

    if (!isFiltered) {
      return places;
    }

    let commonList = [];

    if (local.length !== 0) {
      const localList = places.filter((place) => local?.includes(place.local));
      commonList =
        menu.length === 0
          ? localList
          : localList.filter((place) => menu?.includes(place.type?.main));
    } else if (menu.length !== 0) {
      const menuList = places.filter((place) =>
        menu?.includes(place.type?.main)
      );
      commonList =
        local.length === 0
          ? menuList
          : menuList.filter((place) => local?.includes(place.local));
    }
    return commonList;
  },
});
