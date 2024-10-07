import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import Home from '../Home';
import Estudar from '../Estudar';
import Comunidade from '../Comunidade';
import Colors from '../../Components/Colors';
import ButtonNew from '../../Components/ButtonNew';

export default function Routes() {
    
    const Tab = createBottomTabNavigator();

 return (
    <Tab.Navigator
        screenOptions={{
            tabBarLabelStyle: {
                color: Colors.azulEscuro,
                fontSize: 14,
                fontWeight: 'bold',
      
            },
            tabBarStyle:{
                height: 70,
                paddingBottom: 5,
                paddingTop:5
                
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
                tabBarLabel: '',
                tabBarIcon: ({ color, size, focused }) => (
                   <ButtonNew focused={focused} size={size} />     
                )
            }}
        />
        <Tab.Screen
            name="Comunidade"
            component={Comunidade}
            options={{
                headerShown: false,
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