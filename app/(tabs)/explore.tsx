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
} from "react-native";
import Task from "./components/Task";
import Icon from "react-native-vector-icons/FontAwesome";

const ToDo = () => {
  const [listTitle, setListTitle] = useState(""); // Voor het invoeren van de titel van de lijst
  const [task, setTask] = useState(""); // Voor het invoeren van de taak
  const [lists, setLists] = useState([]); // Voor het opslaan van de lijsten met taken
  const [selectedList, setSelectedList] = useState(null); // Houd de geselecteerde lijst bij

  const handleAddList = () => {
    if (listTitle.trim() === "") {
      alert("Please enter a list title!");
      return;
    }
    setLists([...lists, { id: lists.length + 1, title: listTitle, tasks: [] }]);
    setListTitle(""); // Reset de titel na het toevoegen
  };

  const handleAddTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task before adding!");
      return;
    }
    if (!selectedList) return;

    setLists(
      lists.map((list) => {
        if (list.id === selectedList.id) {
          return {
            ...list,
            tasks: [...list.tasks, { text: task, isCompleted: false }],
          };
        }
        return list;
      })
    );
    setTask(""); // Reset de taak na het toevoegen
  };

  const completeTask = (taskIndex) => {
    if (!selectedList) return;

    setLists(
      lists.map((list) => {
        if (list.id === selectedList.id) {
          const updatedTasks = list.tasks.map((task, index) => {
            if (index === taskIndex) {
              return { ...task, isCompleted: !task.isCompleted }; // Toggle de status
            }
            return task;
          });
          return { ...list, tasks: updatedTasks };
        }
        return list;
      })
    );
  };

  const deleteTask = (taskIndex) => {
    if (!selectedList) return;

    setLists(
      lists.map((list) => {
        if (list.id === selectedList.id) {
          const updatedTasks = list.tasks.filter(
            (_, index) => index !== taskIndex
          );
          return { ...list, tasks: updatedTasks };
        }
        return list;
      })
    );
  };

  const deleteList = (listId) => {
    setLists(lists.filter((list) => list.id !== listId));
    if (selectedList && selectedList.id === listId) {
      setSelectedList(null); // Reset de geselecteerde lijst als deze wordt verwijderd
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <TextInput
          style={styles.input}
          placeholder="List Title"
          value={listTitle}
          onChangeText={(text) => setListTitle(text)}
        />
        <TouchableOpacity onPress={handleAddList}>
          <View style={styles.adWrapper}>
            <Icon name="plus" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {selectedList ? (
        <View style={styles.selectedListContainer}>
          <Text style={styles.listTitle}>{selectedList.title}</Text>
          <View style={styles.tasksWrapper}>
            {selectedList.tasks.map((task, index) => (
              <Task
                key={index}
                text={task.text}
                isCompleted={task.isCompleted}
                onComplete={() => completeTask(index)}
                onDelete={() => deleteTask(index)}
              />
            ))}
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}
          >
            <TextInput
              style={styles.input}
              placeholder="Write a task"
              value={task}
              onChangeText={(text) => setTask(text)}
            />
            <TouchableOpacity onPress={handleAddTask}>
              <View style={styles.adWrapper}>
                <Icon name="plus" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedList(null)}
          >
            <Text style={styles.backButtonText}>Back to Lists</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.listsWrapper}>
          {lists.map((list) => (
            <TouchableOpacity
              key={list.id}
              onPress={() => setSelectedList(list)}
              style={styles.listWrapper}
            >
              <View style={styles.listHeader}>
                <Text style={styles.listTitle}>{list.title}</Text>
                <TouchableOpacity onPress={() => deleteList(list.id)}>
                  <Icon name="times" size={24} color="#FF6347" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default ToDo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: "70%",
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  adWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  listsWrapper: {
    marginTop: 20,
  },
  listWrapper: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedListContainer: {
    flex: 1,
  },
  tasksWrapper: {
    marginBottom: 20,
  },
  writeTaskWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 10,
  },
  backButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
