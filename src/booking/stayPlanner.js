import { hotelList } from "../hotelData/hotelList";

export const createWeeklyStayPlan = (days, allowSameHotel) => {
  const plan = [];

  // if same hotel then we pick one hotel and use it for all days
  if (allowSameHotel) {
    const selectedHotel =
      hotelList[Math.floor(Math.random() * hotelList.length)];

    for (let day = 1; day <= days; day++) {
      plan.push({
        day,
        hotelName: selectedHotel.name,
        price: selectedHotel.price,
      });
    }

    return plan;
  }

  // otherwise, make sure same hotel is not repeated on consecutive days
  let lastHotelId = null;

  for (let day = 1; day <= days; day++) {
    const availableHotels = hotelList.filter(
      (hotel) => hotel.id !== lastHotelId
    );

    const selectedHotel =
      availableHotels[Math.floor(Math.random() * availableHotels.length)];

    plan.push({
      day,
      hotelName: selectedHotel.name,
      price: selectedHotel.price,
    });

    lastHotelId = selectedHotel.id;
  }

  return plan;
};
