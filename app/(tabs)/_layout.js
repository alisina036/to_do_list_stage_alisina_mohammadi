import React, { useState } from "react";
import {
  Keyboard,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TextInput,
  ScrollView,
} from "react-native";
import Task from "./components/Task";
import Icon from "react-native-vector-icons/FontAwesome";
import Stats from "./components/Stats";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

const ToDo = () => {
  // State hooks om app-gegevens en UI-toestanden te beheren
  const [listTitle, setListTitle] = useState(""); // Invoer voor de nieuwe lijsttitel
  const [task, setTask] = useState(""); // Invoer voor nieuwe taak
  const [lists, setLists] = useState([]); // Lijst van taaklijsten
  const [selectedListId, setSelectedListId] = useState(null); // Huidig geopende lijst
  const [searchTerm, setSearchTerm] = useState(""); // Zoekterm voor filteren
  const [isDarkMode, setIsDarkMode] = useState(false); // Donkere modus toggle

  // Voeg een nieuwe lijst met taken toe
  const handleAddList = () => {
    if (listTitle.trim() === "") {
      alert("Voer een lijsttitel in!"); // Validatie voor lege invoer
      return;
    }
    setLists([...lists, { id: lists.length + 1, title: listTitle, tasks: [] }]); // Voeg nieuwe lijst toe
    setListTitle(""); // Reset invoerveld
  };

  // Voeg een nieuwe taak toe aan de geselecteerde lijst
  const handleAddTask = (listId) => {
    if (task.trim() === "") {
      alert("Voer een taak in voordat je toevoegt!"); // Validatie voor lege invoer
      return;
    }
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          return {
            ...list,
            tasks: [...list.tasks, { text: task, isCompleted: false }], // Voeg nieuwe taak toe
          };
        }
        return list; // Geef ongewijzigde lijsten terug
      })
    );
    setTask(""); // Reset taak invoerveld
  };

  // Wijzig de status van een taak (voltooid / niet voltooid)
  const completeTask = (listId, taskIndex) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          const updatedTasks = list.tasks.map((task, index) => {
            if (index === taskIndex) {
              return { ...task, isCompleted: !task.isCompleted }; // Wijzig de voltooiingsstatus
            }
            return task;
          });
          return { ...list, tasks: updatedTasks }; // Geef de bijgewerkte lijst terug
        }
        return list; // Geef ongewijzigde lijsten terug
      })
    );
  };

  // Verwijder een specifieke taak uit een lijst
  const deleteTask = (listId, taskIndex) => {
    setLists(
      lists.map((list) => {
        if (list.id === listId) {
          const updatedTasks = list.tasks.filter(
            (_, index) => index !== taskIndex
          ); // Verwijder taak op index
          return { ...list, tasks: updatedTasks };
        }
        return list; // Geef ongewijzigde lijsten terug
      })
    );
  };

  // Verwijder een gehele lijst
  const deleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId)); // Verwijder lijst op ID
    if (selectedListId === listId) setSelectedListId(null); // Sluit geselecteerde lijst als deze is verwijderd
  };

  // Open of sluit een lijst
  const toggleList = (listId) => {
    setSelectedListId(selectedListId === listId ? null : listId); // Toggle lijstweergave
  };

  // Controleer of alle taken in een lijst zijn voltooid
  const isListCompleted = (list) => {
    return (
      list.tasks.length > 0 && list.tasks.every((task) => task.isCompleted)
    ); // Alle taken moeten voltooid zijn
  };

  // Filter lijsten en taken op basis van de zoekterm
  const filteredLists = lists.filter((list) => {
    const listMatch = list.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()); // Vergelijk lijsttitel
    const tasksMatch = list.tasks.some((task) =>
      task.text.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Vergelijk taaktekst
    return listMatch || tasksMatch; // Voeg lijsten of taken toe die overeenkomen
  });

  // Wissel tussen lichte en donkere modus
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode); // Wissel thema
  };

  return (
    <View style={styles.container(isDarkMode)}>
      <ScrollView style={styles.scrollContainer}>
        {/* Header sectie */}
        <View style={styles.header(isDarkMode)}>
          <Text style={styles.headerText(isDarkMode)}>Mijn ToDo App</Text>
          <TouchableOpacity onPress={toggleTheme}>
            <Icon
              name={isDarkMode ? "moon-o" : "sun-o"}
              size={24}
              color="#fff"
            />{" "}
          </TouchableOpacity>
        </View>
        <Stats lists={lists} />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Voeg nieuwe lijst toe */}
        <View style={styles.listContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nieuwe lijsttitel"
            value={listTitle}
            onChangeText={(text) => setListTitle(text)}
            onSubmitEditing={handleAddList}
          />
          <TouchableOpacity onPress={handleAddList}>
            <View style={styles.addButton}>
              <Icon name="plus" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Toon lijsten */}
        <View style={styles.listsWrapper}>
          {filteredLists.map((list) => (
            <View
              key={list.id}
              style={[
                styles.listWrapper,
                isListCompleted(list) && styles.completedList,
              ]}
            >
              {/* Lijsttitel en toggle */}
              <TouchableOpacity
                onPress={() => toggleList(list.id)}
                style={styles.listHeader}
              >
                <Text style={styles.listTitle}>{list.title}</Text>
                <Icon
                  name={
                    selectedListId === list.id
                      ? "chevron-down"
                      : "chevron-right"
                  }
                  size={20}
                  color="#55BCF6"
                />
              </TouchableOpacity>

              {/* Taken in de geselecteerde lijst */}
              {selectedListId === list.id && (
                <View style={styles.tasksWrapper}>
                  {list.tasks.map((task, index) => (
                    <Task
                      key={index}
                      text={task.text}
                      isCompleted={task.isCompleted}
                      onComplete={() => completeTask(list.id, index)}
                      onDelete={() => deleteTask(list.id, index)}
                    />
                  ))}
                  <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.writeTaskWrapper}
                  >
                    <TextInput
                      style={styles.input}
                      placeholder="Schrijf een taak"
                      value={task}
                      onChangeText={(text) => setTask(text)}
                      onSubmitEditing={() => handleAddTask(list.id)}
                    />
                    <TouchableOpacity onPress={() => handleAddTask(list.id)}>
                      <View style={styles.addButton}>
                        <Icon name="plus" size={24} color="#fff" />
                      </View>
                    </TouchableOpacity>
                  </KeyboardAvoidingView>
                </View>
              )}

              {/* Verwijder lijst knop */}
              <TouchableOpacity
                onPress={() => deleteList(list.id)}
                style={styles.deleteListButton}
              >
                <Icon name="trash" size={24} color="#FF6347" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  container: (isDarkMode) => ({
    flex: 1,
    backgroundColor: isDarkMode ? "#1E1E1E" : "#F1F8FF", // Donkere modus achtergrond
  }),
  header: (isDarkMode) => ({
    backgroundColor: isDarkMode ? "#333" : "#55BCF6", // Donkere modus header
    padding: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  }),
  headerText: (isDarkMode) => ({
    color: isDarkMode ? "#fff" : "#000", // Tekstkleur op basis van het thema
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  }),
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#C0C0C0",
  },
  addButton: {
    backgroundColor: "#55BCF6", // Blauw voor de toevoegknop
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
  },
  scrollContainer: {
    flex: 1,
  },
  listsWrapper: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  listWrapper: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  completedList: {
    borderColor: "#00B0FF", // Lichtblauwe rand voor voltooide lijsten
    borderWidth: 2,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#55BCF6", // Blauw voor lijstnaam
    flexWrap: "wrap",
  },
  tasksWrapper: {
    marginTop: 10,
  },
  deleteListButton: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  writeTaskWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
