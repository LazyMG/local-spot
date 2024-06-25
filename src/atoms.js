import { atom, selector } from "recoil";
import { getOpenBusinesses } from "./utils/parsing";

// export const placeState = atom({
//   key: "placeState",
//   default: newLocalData,
// });

export const placeState = atom({
  key: "placeState",
  default: [],
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

    if (local?.length === 0 && menu?.length === 0 && time?.length === 0)
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
          : localList.filter((place) => menu?.includes(place.type));
      commonList =
        time.length === 0 ? commonList : getOpenBusinesses(commonList);
    } else if (menu.length !== 0) {
      const menuList = places.filter((place) => menu?.includes(place.type));
      commonList =
        local.length === 0
          ? menuList
          : menuList.filter((place) => local?.includes(place.local));
      commonList =
        time.length === 0 ? commonList : getOpenBusinesses(commonList);
    } else if (time.length !== 0) {
      const timeList = getOpenBusinesses(places);
      commonList =
        local.length === 0
          ? timeList
          : timeList.filter((place) => menu?.includes(place.local));
      commonList =
        menu.length === 0
          ? timeList
          : timeList.filter((place) => menu?.includes(place.type));
    }
    return commonList;
  },
});
