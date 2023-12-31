import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF1E9",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  quote: {
    backgroundColor: "#FECB3A",
    borderRadius: "15%",
    margin: "2%",
    padding: "4%",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 12,
  },
  modal: {
    padding: 30,
    backgroundColor: "#FCF1E9",
    height: "100%",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackdrop: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 5000,
  },
  halfModal: {
    padding: 30,
    backgroundColor: "#FCF1E9",
    height: "100%",
    marginTop: "auto",
    height: "50%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default styles;
