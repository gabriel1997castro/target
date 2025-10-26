import { Suspense } from "react";

import { colors } from "@/theme/colors";
import { Stack } from "expo-router";
import {
  useFonts,
  Inter_700Bold,
  Inter_500Medium,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { Loading } from "@/components/Loading";

import { migrate } from "@/database/migrate";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });

  if (!fontLoaded) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <SQLiteProvider databaseName="target.db" onInit={migrate} useSuspense>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.white },
          }}
        />
      </SQLiteProvider>
    </Suspense>
  );
}
