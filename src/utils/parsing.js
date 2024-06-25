export const calculateCenter = (places) => {
  // 필터링된 요소 객체들의 좌표를 합산합니다.
  const totalLat = places.reduce((acc, curr) => acc + +curr.coordinate.lat, 0);
  const totalLng = places.reduce((acc, curr) => acc + +curr.coordinate.lng, 0);

  // 합산된 좌표를 요소 객체의 개수로 나누어 평균 좌표를 구합니다.
  const centerLat = totalLat / places.length;
  const centerLng = totalLng / places.length;

  // 구한 평균 좌표를 반환합니다.
  //console.log(centerLat, centerLng);
  return { centerLat, centerLng };
};

export const changeDayToKor = (day) => {
  switch (day) {
    case "Mon":
      return "월";
    case "Tue":
      return "화";
    case "Wed":
      return "수";
    case "Thu":
      return "목";
    case "Fri":
      return "금";
    case "Sat":
      return "토";
    case "Sun":
      return "일";
    default:
      return "X";
  }
};

export function getTodayDay(acc = 0) {
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date().getDay() + acc;
  return days[today % 7];
}

export function isCurrentTimeWithinRange(openingHours, currentTime) {
  const [openTime, closeTime] = openingHours
    .split(" - ")
    .map((time) => time.trim());

  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);

  const openingDate = new Date(currentTime);
  openingDate.setHours(openHour, openMinute, 0, 0);

  const closingDate = new Date(currentTime);
  closingDate.setHours(closeHour, closeMinute, 0, 0);

  // Handle cases where closing time is after midnight
  if (closingDate < openingDate) {
    closingDate.setDate(closingDate.getDate() + 1);
  }

  return currentTime >= openingDate && currentTime <= closingDate;
}

export function getOpenBusinesses(businesses) {
  const today = getTodayDay();
  const currentTime = new Date();

  return businesses.filter((business) => {
    const hours = business.business_hours[today];
    if (!hours || hours.includes("휴무") || hours.includes("휴업")) {
      return false;
    }

    // 영업시간만 추출 (라스트오더 등 추가 정보 제외)
    const [businessHours] = hours.split("(");
    return isCurrentTimeWithinRange(businessHours.trim(), currentTime);
  });
}
