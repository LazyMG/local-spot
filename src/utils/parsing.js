export const calculateCenter = (places) => {
  // 필터링된 요소 객체들의 좌표를 합산합니다.
  const totalLat = places.reduce((acc, curr) => acc + curr.lat, 0);
  const totalLng = places.reduce((acc, curr) => acc + curr.lng, 0);

  // 합산된 좌표를 요소 객체의 개수로 나누어 평균 좌표를 구합니다.
  const centerLat = totalLat / places.length;
  const centerLng = totalLng / places.length;

  // 구한 평균 좌표를 반환합니다.
  //console.log(centerLat, centerLng);
  return { centerLat, centerLng };
};
