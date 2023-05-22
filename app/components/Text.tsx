import React, { ReactNode } from "react";
import { Text, TextProps } from "react-native";

import defaultStyles from "../config/styles";

interface AppTextProps extends TextProps {
  children: ReactNode;
  style?: {};
}

const AppText = ({ children, style, ...otherProps }: AppTextProps) => {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
