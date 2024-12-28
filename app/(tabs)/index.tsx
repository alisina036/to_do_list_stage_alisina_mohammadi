import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
// import Header from "../(tabs)/layout/header";
import "../../global.css";
// import Task from "./components/task";

const ToDo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>To Do List</Text>

        <View style={styles.items}>{/* <Task /> */}</View>
      </View>
    </View>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    padding: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {},
});
