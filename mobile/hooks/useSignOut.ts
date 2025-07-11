import { useClerk } from "@clerk/clerk-expo";
import { useCustomAlert } from "./useCustomAlert";

export const useSignOut = () => {
  const { signOut } = useClerk();
  const { alertConfig, isVisible, showAlert, hideAlert } = useCustomAlert();

  const handleSignOut = () => {
    showAlert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => signOut(),
      },
    ]);
  };

  return { 
    handleSignOut,
    alertConfig,
    isVisible,
    hideAlert,
  };
};