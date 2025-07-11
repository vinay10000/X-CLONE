import { useSignOut } from "@/hooks/useSignOut";
import { useAuth } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { CustomAlert } from "./CustomAlert";

const SignOutButton = () => {
    const { handleSignOut, alertConfig, isVisible, hideAlert } = useSignOut();

    const { signOut } = useAuth();
    return (
        <>
            <TouchableOpacity onPress={handleSignOut} className="bg-red-500 p-2 rounded-md">
                <Feather name="log-out" size={24} color="#E0245E" />
            </TouchableOpacity>
            
            {alertConfig && (
                <CustomAlert
                    visible={isVisible}
                    title={alertConfig.title}
                    message={alertConfig.message}
                    buttons={alertConfig.buttons}
                    onClose={hideAlert}
                />
            )}
        </>
    )
}

export default SignOutButton;