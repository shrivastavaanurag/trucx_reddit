import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function Filter(index, actions, onPress) {
    return (
          <TouchableOpacity key={index} onPress={onPress} style={{  }}>
              <View style={{ flexDirection: 'row', backgroundColor: '#d8d8d8', borderRadius: 8, borderWidth: 0.5, borderColor: '#838383'}} >
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 15, padding: 5 }} >{actions.text}</Text>
              </View>
          </TouchableOpacity>
    );
}

export default Filter;
