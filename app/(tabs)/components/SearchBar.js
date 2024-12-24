import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#55BCF6" />
        <TextInput
          style={styles.searchInput}
          placeholder="Zoek lijsten en taken"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    padding: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    width: "80%",
  },
  searchInput: {
    marginLeft: 10,
    width: "90%",
    height: 40,
  },
});

export default SearchBar;
