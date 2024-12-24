import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome"; // Je kunt ook een andere icoon gebruiken of een native checkbox

const Task = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={props.onComplete} style={styles.checkbox}>
          {/* Toon een vinkje als de taak voltooid is */}
          {props.isCompleted ? (
            <Icon name="check-circle" size={24} color="#55BCF6" />
          ) : (
            <Icon name="circle-thin" size={24} color="#55BCF6" />
          )}
        </TouchableOpacity>
        <Text
          style={[styles.itemText, props.isCompleted && styles.completedText]}
        >
          {props.text}
        </Text>
      </View>
      {/* Verwijderknop voor de taak */}
      <TouchableOpacity onPress={props.onDelete}>
        <View style={styles.circular}>
          <Icon name="times" size={20} color="#FF6347" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Laat het flexibele ruimte innemen
  },
  checkbox: {
    marginRight: 15,
  },
  itemText: {
    flexShrink: 1, // Tekst wordt kleiner gemaakt als het te groot is
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#A9A9A9", // Lichte grijs voor voltooide tekst
  },
  circular: {
    justifyContent: "center",
    alignItems: "center",
    width: 30, // Geef de delete-knop een vaste breedte
    height: 30, // Optioneel, voor consistentie
  },
});
