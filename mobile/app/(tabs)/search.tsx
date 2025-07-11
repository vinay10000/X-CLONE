import { Feather } from "@expo/vector-icons";
import { View, TextInput, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TRENDING_TOPICS = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#TypeScript", tweets: "89K" },
  { topic: "#WebDevelopment", tweets: "234K" },
  { topic: "#AI", tweets: "567K" },
  { topic: "#TechNews", tweets: "98K" },
  { topic: "#JavaScript", tweets: "342K" },
  { topic: "#Python", tweets: "456K" },
  { topic: "#MachineLearning", tweets: "278K" },
  { topic: "#CloudComputing", tweets: "189K" },
  { topic: "#Cybersecurity", tweets: "156K" },
  { topic: "#BlockChain", tweets: "134K" },
  { topic: "#DataScience", tweets: "267K" },
  { topic: "#DevOps", tweets: "145K" },
  { topic: "#MobileApp", tweets: "198K" },
  { topic: "#Frontend", tweets: "223K" },
];

const SearchScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* HEADER */}
      <View className="px-8 py-8">
        <View 
          className="flex-row items-center rounded-2xl px-6 py-5"
          style={{
            backgroundColor: '#000',
            
            elevation: 5,
            borderWidth: 2,
            borderColor: '#353A38',
          }}
        >
          <Feather name="search" size={24} color="#00bfff" />
          <TextInput
            placeholder="Search"
            className="flex-1 ml-4 text-base text-white"
            placeholderTextColor="#888"
            style={{ fontSize: 18 }}
          />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">Trending for you</Text>
          {TRENDING_TOPICS.map((item, index) => (
            <TouchableOpacity key={index} className="py-3 border-b border-gray-100">
              <Text className="text-gray-500 text-sm">Trending in Technology</Text>
              <Text className="font-bold text-white text-lg">{item.topic}</Text>
              <Text className="text-gray-500 text-sm">{item.tweets} Tweets</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;