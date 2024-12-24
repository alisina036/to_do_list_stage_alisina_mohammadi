import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Stats = ({ lists }) => {
  // Totale lijstinformatie
  const totalLists = lists.length;
  const completedLists = lists.filter((list) =>
    list.tasks.every((task) => task.isCompleted)
  ).length;

  // Totale takeninformatie
  const totalTasks = lists.reduce((acc, list) => acc + list.tasks.length, 0);
  const completedTasks = lists.reduce(
    (acc, list) => acc + list.tasks.filter((task) => task.isCompleted).length,
    0
  );

  return (
    <View style={styles.main}>
      <View style={styles.statsContainer}>
        <Text style={styles.headerText}>Algemene Statistieken</Text>
        <Text style={styles.statsText}>
          Totaal aantal lijsten: {totalLists}
        </Text>
        <Text style={styles.statsText}>
          Voltooide lijsten: {completedLists}
        </Text>
        <Text style={styles.statsText}>Totaal aantal taken: {totalTasks}</Text>
        <Text style={styles.statsText}>Voltooide taken: {completedTasks}</Text>

        {/* Gedetailleerde voortgang per lijst */}
        {lists.map((list) => {
          const completedTasksInList = list.tasks.filter(
            (task) => task.isCompleted
          ).length;
          return (
            <View key={list.id} style={styles.listStatsContainer}>
              <Text style={styles.listTitle}>{list.title}</Text>
              <Text style={styles.listStats}>
                {completedTasksInList} van {list.tasks.length} taken voltooid
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    padding: 15,
    backgroundColor: "#55BCF6", // Lichte blauw voor stats container
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 10,
    width: "80%",
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsText: {
    color: "#fff",
    fontSize: 16,
  },
  listStatsContainer: {
    marginTop: 15,
  },
  listTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listStats: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Stats;
