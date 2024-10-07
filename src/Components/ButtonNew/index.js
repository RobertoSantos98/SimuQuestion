import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../Colors';

export default function ButtonNew({ focused, size}) {
 return (
    <View style={{ 
        backgroundColor: Colors.coral, 
        width: 90, 
        height: 90, 
        borderRadius: 45,
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.white
        }}>
        
        <Icon 
            name={ focused ? 'book-open-variant' : 'book-outline' }
            size={ focused ? size + 18 : size + 8 } 
            color={Colors.white} />
        <Text style={{ color: focused ? Colors.white : Colors.white, fontWeight: 'bold'}} >
            Estudar
        </Text>
    </View>
  );
}