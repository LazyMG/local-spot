export const filteringMarker = (markers, option) => {
  console.log(option);

  if (option.length === 0) {
    return markers;
  }
  return markers.filter((marker) => option?.includes(marker.local));
};

export const calculateCenter = (markers, filter) => {
  // filter 배열에 해당하는 local 값을 가진 요소 객체들을 필터링합니다.
  const filteredData = markers.filter((item) => filter.includes(item.local));

  // 필터링된 요소 객체들의 좌표를 합산합니다.
  const totalLat = filteredData.reduce((acc, curr) => acc + curr.lat, 0);
  const totalLng = filteredData.reduce((acc, curr) => acc + curr.lng, 0);

  // 합산된 좌표를 요소 객체의 개수로 나누어 평균 좌표를 구합니다.
  const centerLat = totalLat / filteredData.length;
  const centerLng = totalLng / filteredData.length;

  // 구한 평균 좌표를 반환합니다.
  //console.log(centerLat, centerLng);
  return { centerLat, centerLng };
};
