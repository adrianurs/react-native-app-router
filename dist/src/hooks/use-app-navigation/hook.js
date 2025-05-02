import { getNavigate } from "./get-navigate";
import { useNavigation } from "@react-navigation/native";
export function useAppNavigation() {
    const navigation = useNavigation();
    const navigate = getNavigate(navigation);
    return {
        navigate
    };
}
