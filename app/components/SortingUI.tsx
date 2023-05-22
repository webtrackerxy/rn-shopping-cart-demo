import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

interface SortingUIprops {
  sortFunc: (sortType: string, ordering: string) => void;
}
const SortingUI = ({ sortFunc }: SortingUIprops) => {
  const [modalVisible, setModalVisible] = useState(false);

  const sortOptions = [
    {
      label: "Product price high to low",
      value: "price",
      ordering: "descending",
    },
    {
      label: "Product price low to high",
      value: "price",
      ordering: "ascending",
    },
    {
      label: "Product rating high to low",
      value: "rating",
      ordering: "descending",
    },
    {
      label: "Product rating low to high",
      value: "rating",
      ordering: "ascending",
    },
    {
      label: "Product title Z-A",
      value: "title",
      ordering: "descending",
    },
    {
      label: "Product title A-Z",
      value: "title",
      ordering: "ascending",
    },
  ];

  const handleSort = (value: any, ordering: any) => {
    setModalVisible(false);
    sortFunc(value, ordering);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="sort" size={30} color="#000" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <TouchableOpacity activeOpacity={1}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 20,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Select Sort Order
                </Text>
                {sortOptions.map((option, index) => (
                  <Button
                    key={index}
                    onPress={() => handleSort(option.value, option.ordering)}
                    title={option.label}
                    buttonStyle={{
                      backgroundColor: "blue",
                      borderRadius: 3,
                    }}
                  />
                ))}
                <Button
                  title="Cancel"
                  buttonStyle={{
                    backgroundColor: "red",
                    borderRadius: 3,
                  }}
                  onPress={() => setModalVisible(false)}
                />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SortingUI;
