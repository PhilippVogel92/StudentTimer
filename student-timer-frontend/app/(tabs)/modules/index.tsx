import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { FlatList } from "react-native-gesture-handler";
import { ModuleCard } from "@/components/modules/ModuleCard";
import { useFocusEffect, useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import Button from "@/components/Button";
import { BASE_STYLES, COLORTHEME } from "@/constants/Theme";
import React, { useState } from "react";
import { useModules } from "@/context/ModuleContext";
import { H2 } from "@/components/StyledText";

export default function ModulesScreen() {
  const router = useRouter();

  const [contextMenuOpen, setContextMenuOpen] = useState(-1);
  const { modules: fetchedModules, fetchModules } = useModules();
  const [modules, setModules] = useState<ModuleType[] | undefined>(
    fetchedModules
  );

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        fetchModules && (await fetchModules());
        if (fetchedModules?.length) {
          setModules(fetchedModules);
        }
      })();
    }, [])
  );

  // TODO?
  const isLoading = false;
  const error = false;

  const onNewModulePress = () => router.push("/modules/new");

  return (
    <View style={styles.container}>
      <FlatList
        data={modules}
        style={styles.flatListContainer}
        renderItem={({ item }) => (
          <ModuleCard
            moduleData={item}
            contextMenuOpen={contextMenuOpen}
            setContextMenuOpen={setContextMenuOpen}
          />
        )}
        keyExtractor={(item: ModuleType) => item.id.toString()}
        contentContainerStyle={styles.flatListContainerContent}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <H2>Es sind noch keine Module vorhanden.</H2>
          </View>
        }
      />
      <Button
        text={"Neues Modul anlegen"}
        backgroundColor={COLORTHEME.light.primary}
        textColor={COLORTHEME.light.grey2}
        onPress={onNewModulePress}
        style={styles.button}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  flatListContainer: {
    borderRadius: BASE_STYLES.borderRadius,
  },
  flatListContainerContent: {
    gap: 24,
    paddingBottom: 50 + BASE_STYLES.horizontalPadding,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    bottom: BASE_STYLES.horizontalPadding,
    width: "100%",
  },
});
