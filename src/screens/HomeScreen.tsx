import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import * as Keychain from 'react-native-keychain'

const HomeScreen = () => {

  const saveCredentials = async () => {
    try {
      const username = 'johndoe';
      const password = 'securepassword123';
    
      // Store the credentials
      await Keychain.setGenericPassword(username, password);
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }
  
  const getCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      alert(JSON.stringify(credentials))
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  return (
    <View style={styles.container}>
      <Button title='Save credentials' onPress={saveCredentials} />
      <View style={styles.spacer} />
      <Button title='Get credentials' onPress={getCredentials} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    paddingVertical: 20
  }
});

export default HomeScreen;
