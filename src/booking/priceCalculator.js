export const calculateFinalAmount = (days) => {
  const pricePerNight = 1000;
  const couponDiscount = 0.2; // 20%
  const maxCoupons = 3;
  const gstRate = 0.05;

  const baseAmount = days * pricePerNight;

  // coupon applied max 3 times
  const discountAmount =
    pricePerNight * couponDiscount * maxCoupons;

  let totalAmount = baseAmount - discountAmount;

  let gstAmount = 0;
  if (totalAmount > 999) {
    gstAmount = totalAmount * gstRate;
    totalAmount += gstAmount;
  }

  return {
    baseAmount,
    discountAmount,
    gstAmount: gstAmount,
    finalAmount: totalAmount,
  };
};
