import { MoreVertical } from "lucide-react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ModuleChart } from "./ModuleChart";
import { H4, P, Subhead } from "../StyledText";
import { COLORTHEME } from "@/constants/Theme";
import { useRouter } from "expo-router";
import { ModuleType } from "@/types/ModuleType";
import { computeDeadline } from "@/libs/moduleTypeHelper";
import { convertMinutesToHours } from "@/libs/timeHelper";

export function ModuleCard(moduleData: ModuleType) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `modules/${moduleData.id}`,
        } as never)
      }
    >
      <View style={styles.outerWrapper}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextRow}>
            <View
              style={[
                styles.moduleIndicatorM,
                { backgroundColor: moduleData.colorCode },
              ]}
            />
            <H4>{moduleData.name}</H4>
          </View>
          <TouchableOpacity>
            <MoreVertical size={28} fill="black" strokeWidth={1}></MoreVertical>
          </TouchableOpacity>
        </View>
        {/* Statistics */}
        <View style={styles.statisticsContainer}>
          <ModuleChart
            inputData={moduleData.learningUnits}
            totalAmount={convertMinutesToHours(moduleData.totalModuleTime)}
            totalAmountDone={convertMinutesToHours(
              moduleData.totalLearningTime
            )}
            width={100}
            height={100}
          />
          <View style={styles.statisticsUnitContainer}>
            {moduleData.learningUnits.map((unit) => {
              return (
                <View key={unit.id} style={styles.headerTextRow}>
                  <View
                    style={[
                      styles.moduleIndicatorS,
                      { backgroundColor: unit.colorCode },
                    ]}
                  />
                  <P>{unit.name}</P>
                </View>
              );
            })}
          </View>
        </View>
        {/* Results */}
        <View style={styles.headerRow}>
          <View style={styles.resultColumn}>
            <P style={{ textAlign: "center" }}>Zeit bis zur Prüfung</P>
            <Subhead>{computeDeadline(moduleData.examDate)}</Subhead>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.resultColumn}>
            <P style={{ textAlign: "center" }}>Selbststudium</P>
            <Subhead>
              {`${convertMinutesToHours(
                moduleData.totalLearningSessionTime
              )} von ${convertMinutesToHours(
                moduleData.totalLearningUnitTime
              )} Std.`}
            </Subhead>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey2,
    // shadowColor: "black",
    // shadowOffset: { width: -2, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "8%",
    gap: 16,
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moduleIndicatorM: {
    width: 24,
    height: 24,
    borderRadius: 1000,
  },
  moduleIndicatorS: {
    width: 16,
    height: 16,
    borderRadius: 1000,
  },
  headerTextRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  resultColumn: {
    width: "45%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  statisticsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  statisticsUnitContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
});
