import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFE4EA",
  },
  appWrapper: {
    flex: 1,
  },
  icon: {
    resizeMode: "contain",
  },
});
