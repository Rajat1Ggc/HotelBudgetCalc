import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";

import { createWeeklyStayPlan } from "../booking/stayPlanner";
import { calculateFinalAmount } from "../booking/priceCalculator";

// memory storage
let bookingCache = null;

const saveBookingData = (data) => {
  bookingCache = data;
};

//not use yet
const getBookingData = () => {
  return bookingCache;
};

const BookingScreen = () => {
  const [budget, setBudget] = useState("6000");
  const [days, setDays] = useState("7");
  const [allowSameHotel, setAllowSameHotel] = useState(false);
  const [result, setResult] = useState(null);

  function checkBooking() {
    const numberOfDays = Number(days);
    const userBudget = Number(budget);

    const stayPlan = createWeeklyStayPlan(
      numberOfDays,
      allowSameHotel
    );

    const priceDetails = calculateFinalAmount(numberOfDays);

    const bookingResult = {
      input: {
        budget: userBudget,
        days: numberOfDays,
        allowSameHotel,
      },
      stayPlan,
      priceDetails,
      isWithinBudget: priceDetails.finalAmount <= userBudget,
    };

    setResult(bookingResult);
    saveBookingData(bookingResult);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hotel Booking Budget Calculate</Text>

      <View style={styles.inputBlock}>
        <Text style={styles.text}>Total Budget (₹)</Text>
        <TextInput
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.inputBlock}>
        <Text style={styles.text}>Number of Days</Text>
        <TextInput
          value={days}
          onChangeText={setDays}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.text}>
          Allow same hotel on consecutive days
        </Text>
        <Switch
          value={allowSameHotel}
          onValueChange={setAllowSameHotel}
        />
      </View>

      <Button title="Check Booking Budget" onPress={checkBooking} />

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.sectionTitle}>Stay Plan</Text>

          {result.stayPlan.map((item) => (
            <Text key={item.day} style={styles.text}>
              Day {item.day}: {item.hotelName}
            </Text>
          ))}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Billing</Text>

          <Text style={styles.text}>
            Base: ₹{result.priceDetails.baseAmount}
          </Text>
          <Text style={styles.text}>
            Discount: -₹{result.priceDetails.discountAmount}
          </Text>
          <Text style={styles.text}>
            GST: ₹{result.priceDetails.gstAmount}
          </Text>

          <Text style={styles.finalAmount}>
            Final Amount: ₹{result.priceDetails.finalAmount}
          </Text>

          <Text
            style={{
              color: result.isWithinBudget ? "green" : "red",
              marginTop: 6,
            }}
          >
            {result.isWithinBudget
              ? "Booking is within budget"
              : "Booking exceeds budget"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
    color: "#000000"
  },
  note: {
    fontSize: 14,
    marginBottom: 15,
    color: "#000000",
  },
  inputBlock: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#474646",
    padding: 8,
    borderRadius: 4,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#363636",
    borderRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 6,
    color: '#000'
  },
  text: {
    color: '#000000'
  },
  divider: {
    height: 1,
    backgroundColor: "#000000",
    marginVertical: 10,
  },
  finalAmount: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 6,
    color: '#000'
  },
});
