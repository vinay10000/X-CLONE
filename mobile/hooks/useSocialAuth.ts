import { useAuth, useSSO } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { startSSOFlow } = useSSO();
  const handleSocialAuth = async (strategy: "oauth_google") => {
    setIsLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
      });
      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (error) {
      console.log(error);

      Alert.alert("Error", `Failed to sign in with google`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth };
};
