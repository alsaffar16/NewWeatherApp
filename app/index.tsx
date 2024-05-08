import { Redirect, useRootNavigationState, useRouter } from "expo-router";

export default function AppIndex() {
    const router = useRouter();
    const rootNavigationState = useRootNavigationState();
    if (!rootNavigationState?.key) return null;
    return <Redirect href={'/logIn'} />
}