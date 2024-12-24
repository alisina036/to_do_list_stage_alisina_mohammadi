import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.footerText}>
        © 2024 Mijn ToDo App. Alle rechten voorbehouden.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#55BCF6", // Blauw om het consistent te houden met andere elementen
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#C0C0C0",
  },
  footerText: {
    color: "#fff", // Witte tekst voor contrast
    fontSize: 14,
    fontWeight: "400",
  },
});

export default Footer;
