import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Home';
import Estudar from '../Estudar';
import Comunidade from '../Comunidade';
import Colors from '../../Components/Colors';

export default function Routes() {
    
    const Tab = createBottomTabNavigator();

 return (
    <Tab.Navigator
        screenOptions={{
            tabBarLabelStyle: {
                color: Colors.azulEscuro,
                fontSize: 14,
                fontWeight: 'bold',
                marginVertical: 8,
                marginTop: 0
            },
            tabBarStyle:{
                borderTopWidth: 0,
                position: 'absolute',
                backgroundColor: Colors.white,
                height: 80,
                width: '100%',
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30, 
            },
        }}
    >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    if (focused) {
                        return <Icon name='home-variant' size={ size + 14 } color={Colors.azulEscuro} />
                    }
                    return <Icon name='home-variant-outline' size={ size + 4 } color={ Colors.azulEscuro } />
                }
            }}
        />
        <Tab.Screen
            name="Estudar"
            component={Estudar}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    if (focused) {
                        return <Icon name='book-open-variant' size={ size + 24 } color={Colors.azulEscuro} />
                    }
                    return <Icon name='book-outline' size={ size + 4 } color={ Colors.azulEscuro } />
                }
            }}
        />
        <Tab.Screen
            name="Comunidade"
            component={Comunidade}
            options={{
                
                tabBarIcon: ({ color, size, focused }) => {
                    if (focused) {
                        return <Icon name='account-group' size={ size + 16 } color={Colors.azulEscuro}/>
                    }
                    return <Icon name='account-group-outline' size={ size + 10 } color={ Colors.azulEscuro } />
                }
            }}
        />
    </Tab.Navigator>
  );
}