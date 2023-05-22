import React, { ReactNode } from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, StyleProp, ViewStyle } from "react-native";

interface ScreenProps {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Screen: React.FC<ScreenProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
