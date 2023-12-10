import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { StarIcon } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { Text, View } from "@/components/Themed";
import { COLORS, COLORTHEME } from "@/constants/Theme";
import { useAuth } from "@/context/AuthContext";
import { useAxios } from "@/context/AxiosContext";
import { useModules } from "@/context/ModuleContext";
import { msToTimeObject, formatTime } from "@/libs/timeHelper";

export default function Success() {
  const { authState } = useAuth();
  const { authAxios } = useAxios();
  const { modules } = useModules();
  const [starAmount, setStarAmount] = useState(0);
  const [description, setDescription] = useState("");
  const { focusTime, pauseTime, moduleId } = useLocalSearchParams<{
    focusTime: string;
    pauseTime: string;
    moduleId: string;
  }>();
  const selectedModule = modules?.find(
    (module) => module.id === Number(moduleId)
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.stars}>
        {[...Array(5)].map((_, index) => (
          <Pressable
            key={index}
            onPress={() => setStarAmount(index + 1)}
            style={styles.star}
          >
            <StarIcon
              name="star"
              color={selectedModule?.colorCode || COLORTHEME.light.primary}
              fill={
                index < starAmount
                  ? selectedModule?.colorCode || COLORTHEME.light.primary
                  : "none"
              }
              size={48}
            />
          </Pressable>
        ))}
      </View>
      <View style={styles.successContainer}>
        <Text style={styles.successText}>Bewerte jetzt deinen Erfolg</Text>
      </View>
      <View style={styles.timeStats}>
        <View style={styles.timeLabelContainer}>
          <Text>Fokuszeit</Text>
          <Text style={styles.timeText}>
            {formatTime(msToTimeObject(Number(focusTime)))}h
          </Text>
        </View>
        <View style={styles.timeLabelContainer}>
          <Text>Pause</Text>
          <Text style={styles.timeText}>
            {formatTime(msToTimeObject(Number(pauseTime)))}h
          </Text>
        </View>
      </View>
      <View>
        <Text>Modul</Text>
        <Text style={{ color: selectedModule?.colorCode }}>
          {selectedModule?.name}
        </Text>
      </View>
      <View>
        <InputField
          label="Beschreibung"
          value={description}
          onChangeText={setDescription}
          placeholder="..."
          style={styles.input}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          text="Abschließen"
          backgroundColor={selectedModule?.colorCode || ""}
          textColor="#FFFFFF"
          disabled={starAmount === 0}
          onPress={async () => {
            const response = await authAxios?.post(
              `/students/${authState?.user.id}/modules/${selectedModule?.id}/learningSessions`,
              {
                totalDuration: Number(focusTime) + Number(pauseTime),
                focusDuration: Number(focusTime),
                rating: starAmount,
                createdAt: new Date().toISOString().replace("Z", ""),
                description: description,
              }
            );
            router.push({
              pathname: "/(tabs)/(tracking)/",
              params: {
                trackingSaved: response?.status === 200 ? 1 : 0,
              },
            });
          }}
        />
        <Button
          style={[
            styles.buttonBorder,
            { borderColor: selectedModule?.colorCode },
          ]}
          text="Tracking fortsetzen"
          backgroundColor={COLORS.white}
          textColor={selectedModule?.colorCode}
          onPress={() => router.push("/(tabs)/(tracking)")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    backgroundColor: COLORS.white,
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
  },
  star: {
    cursor: "pointer",
  },
  successContainer: {
    alignItems: "center",
  },
  successText: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
  },
  timeStats: {
    gap: 20,
  },
  timeLabelContainer: {
    alignItems: "center",
  },
  timeText: {
    fontSize: 20,
    fontWeight: "500",
  },
  input: {
    flexBasis: "auto !important" as any,
  },
  buttons: {
    gap: 10,
  },
  buttonBorder: {
    borderWidth: 3,
  },
});
