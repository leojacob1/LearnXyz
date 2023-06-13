import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Quotes from "./Quotes";
import Learn from "./Learn";
import { Feather, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabsBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Quotes}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="home"
              size={24}
              color={focused ? "#06CCB4" : "black"}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Learn"
        component={Learn}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="school-outline"
              size={24}
              color={focused ? "#06CCB4" : "black"}
            />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsBar;
