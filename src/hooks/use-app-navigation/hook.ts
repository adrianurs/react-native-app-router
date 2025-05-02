import { AppNavigation } from "../../types/app-navigation";
import { getNavigate } from "./get-navigate";
import { useNavigation } from "@react-navigation/native";

export function useAppNavigation(): AppNavigation {
  const navigation = useNavigation();
  const navigate = getNavigate(navigation);

  return {
    navigate,
  };
}
