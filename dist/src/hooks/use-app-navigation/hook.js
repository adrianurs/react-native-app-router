import { navigate } from "./navigate";
import { useNavigation } from "@react-navigation/native";
export function useAppNavigation() {
  const navigation = useNavigation();
  return {
    navigate: navigate.bind({ navigate: navigation.navigate }),
  };
}
