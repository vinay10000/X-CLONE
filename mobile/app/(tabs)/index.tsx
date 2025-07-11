import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignOutButton from "@/components/SignOutButton";
const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <Text>Tabs</Text>
      </View>
      <SignOutButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
