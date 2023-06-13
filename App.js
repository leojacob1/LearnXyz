import { NavigationContainer } from "@react-navigation/native";
import TabsBar from "./TabsBar";
import Quotes from "./Quotes";

export default function App() {
  return (
    <NavigationContainer>
      <TabsBar />
    </NavigationContainer>
  );
}
