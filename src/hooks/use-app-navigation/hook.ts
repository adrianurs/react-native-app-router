import { AppNavigation } from "../../types/app-navigation";
import { navigate } from "./navigate";
import { useNavigation } from "@react-navigation/native";

export function useAppNavigation(): AppNavigation {
  const navigation = useNavigation();

  return {
    navigate: navigate.bind({ navigate: navigation.navigate }),
  };
}
