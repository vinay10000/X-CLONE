import { View, Text, Button } from 'react-native'
import { useClerk } from '@clerk/clerk-expo';


 const HomeScreen = () => {
    const { signOut } = useClerk();
  return (
    <View className='flex-1 items-center justify-center bg-white'>
      <Text className='text-2xl font-bold'>Hello World</Text>
      <Button title='Sign Out' onPress={() => signOut()} titleColor='red' />
    </View>
  )
};
export default HomeScreen;