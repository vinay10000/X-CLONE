import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@clerk/clerk-expo";

// Custom tab button without touch effect
const CustomTabButton = (props: any) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={1} // Removes the opacity change on press
      style={[props.style, { backgroundColor: 'transparent' }]} // Ensures no background color change
    />
  );
};

const TabsLayout = () => {
  const insets = useSafeAreaInsets();
  const {isSignedIn} = useAuth();
  if(!isSignedIn) return <Redirect href="/(auth)" />;
  return (
    <Tabs screenOptions={{
      headerShown : false,
      tabBarActiveTintColor : "#93D676",
      tabBarInactiveTintColor : "#fff",
      tabBarButton: CustomTabButton, // Use custom button
      tabBarStyle : {
        backgroundColor : "#000",
        borderTopColor : "#93D676",
        borderTopWidth : 2,
        paddingTop : 10,
        paddingBottom : 10,
        height : 55+insets.bottom,
      }
      
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title : "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title : "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title : "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title : "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title : "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
