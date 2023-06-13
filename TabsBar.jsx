import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Quotes from "./Quotes";
import Learn from "./Learn";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import db from "./firestore";
import { collection, getDocs } from "firebase/firestore";

const Tab = createBottomTabNavigator();

const TabsBar = () => {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    async function fetchQuotes() {
      const dbQuotes = [];
      const querySnapshot = await getDocs(collection(db, "quotes"));
      querySnapshot.forEach((doc) => {
        dbQuotes.push(doc.data());
      });
      setQuotes(dbQuotes);
    }

    fetchQuotes();
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
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
      >
        {() => <Quotes quotes={quotes} />}
      </Tab.Screen>
      <Tab.Screen
        name="Learn"
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
      >
        {() => <Learn quotes={quotes} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabsBar;
