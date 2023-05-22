import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Rating, Button } from "react-native-elements";
import colors from "../config/colors";

interface ratingProps {
  rateValue: number;
}

const RatingUI = ({ rateValue }: ratingProps) => {
  const [rating, setRating] = useState(5);
  const [isDisabled, setIsDisabled] = useState(false);

  const updateRating = (newRating: number) => {
    setRating(newRating);
    // Here, you can call an API or update your data source with the new rating.
    console.log(`New rating is: ${newRating}`);
  };

  const toggleRating = () => {
    setIsDisabled(!isDisabled);
  };

  useEffect(() => {
    // console.log("RatingUI", rateValue);
    setRating(rateValue);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Rating
        showRating
        readonly={isDisabled}
        ratingCount={5}
        startingValue={rating}
        onFinishRating={updateRating}
        imageSize={30}
        style={{ paddingVertical: 10 }}
        tintColor={isDisabled ? colors.light : colors.white} // light background for disabled rating
      />
      {/* <Button
        onPress={toggleRating}
        title={isDisabled ? "Enable Rating" : "Disable Rating"}
      /> */}
    </View>
  );
};

export default RatingUI;
