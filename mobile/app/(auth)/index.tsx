import {
  ActivityIndicator,
  Button,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSocialAuth } from "../../hooks/useSocialAuth";

export default function Index() {
  const { isLoading, handleSocialAuth } = useSocialAuth();
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          {/* DEMO IMAGE */}
          <View className="items-center">
            <Image
              source={require("../../assets/images/auth2.png")}
              className="size-96"
              resizeMode="contain"
            />
          </View>
          {/* FORM */}
          <View className="flex-col gap-2">
            <TouchableOpacity
              className="flex-row items-center justify-center bg-black border border-gray-300 rounded-2xl py-3 px-6"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="#57ab81" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="size-10 mr-3"
                    resizeMode="contain"
                  />
                  <Text className="text-lg font-bold text-white">
                    Continue with Google
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View className="mt-6 flex-row items-center justify-center">
            <Text className="text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <Text className="text-green-400">Terms of Service</Text> and{" "}
              <Text className="text-green-400">Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
