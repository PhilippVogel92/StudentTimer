import { View, StyleSheet, Pressable } from "react-native";
import { COLORS, COLORTHEME } from "@/constants/Theme";
import DateTimePicker from "../DateTimePicker";
import { LearningUnitType } from "@/types/LearningUnitType";
import { LabelS, P } from "../StyledText";
import UnitPicker from "./UnitPicker";
import { Trash2 } from "lucide-react-native";
import InputFieldNumeric from "../InputFieldNumeric";
import { LearningUnitEnum } from "@/constants/LearningUnitEnum";
import { ObjectKey } from "@/context/ModuleContext";

type LearningUnitFormProps = {
  inputData: LearningUnitType;
  onDelete?: (id: number) => void | undefined;
  onChange: (vaules: LearningUnitType) => void;
};

export function LearningUnitForm(props: LearningUnitFormProps) {
  const { inputData, onDelete, onChange } = props;

  const handleChange = (value: LearningUnitType) => {
    onChange({ ...inputData, ...value });
  };

  const updateWorkloadHours = (value: number) => {
    let formattedHourValue = Math.round(Math.abs(+value * 60));
    let updatedWorkloadPerWeekMinutes = 1;
    if (
      formattedHourValue === 0 &&
      (!inputData.workloadPerWeekMinutes ||
        inputData.workloadPerWeekMinutes <= 0)
    ) {
      updatedWorkloadPerWeekMinutes = 1;
    } else {
      updatedWorkloadPerWeekMinutes = inputData.workloadPerWeekMinutes!;
    }

    let updatedTotalWorkloadPerWeek =
      formattedHourValue + updatedWorkloadPerWeekMinutes;

    console.log(formattedHourValue);
    handleChange({
      workloadPerWeekMinutes: updatedWorkloadPerWeekMinutes,
      workloadPerWeekHours: formattedHourValue,
      workloadPerWeek: updatedTotalWorkloadPerWeek,
    } as LearningUnitType);
  };

  const updateWorkloadMinutes = (value: number) => {
    let formattedValue =
      Math.round(Math.abs(+value)) >= 60 ? 59 : Math.round(Math.abs(+value));
    if (
      formattedValue === 0 &&
      (!inputData.workloadPerWeekHours || inputData.workloadPerWeekHours <= 0)
    ) {
      formattedValue = 1;
    }

    let updatedTotalWorkloadPerWeek;
    if (inputData.workloadPerWeekHours)
      updatedTotalWorkloadPerWeek =
        formattedValue + inputData.workloadPerWeekHours;
    else updatedTotalWorkloadPerWeek = formattedValue;

    handleChange({
      workloadPerWeekMinutes: formattedValue,
      workloadPerWeek: updatedTotalWorkloadPerWeek,
    } as LearningUnitType);
  };

  return (
    <View style={styles.outerWrapper}>
      <View style={styles.row}>
        <UnitPicker
          label="Typ der Lerneinheit"
          value={inputData.name}
          onValueChange={(value) =>
            handleChange({
              name: value,
              colorCode:
                COLORS[
                  Object.keys(LearningUnitEnum)[
                    Object.values(LearningUnitEnum).indexOf(value)
                  ] as ObjectKey
                ],
            } as LearningUnitType)
          }
        />
      </View>
      <View style={styles.dateRowWrapper}>
        <View style={styles.row}>
          <DateTimePicker
            label="Startdatum"
            value={inputData.startDate}
            onChangeDate={(value) => {
              handleChange({ startDate: value } as LearningUnitType);
            }}
            maximumDate={inputData.endDate}
          />
          <DateTimePicker
            label="Enddatum"
            value={inputData.endDate}
            onChangeDate={(value) =>
              handleChange({ endDate: value } as LearningUnitType)
            }
            minimumDate={inputData.startDate}
          />
        </View>
      </View>
      <View style={styles.workloadRowContainer}>
        <P style={{ color: COLORTHEME.light.primary }}>
          {"Arbeitsaufwand pro Woche"}
        </P>
        <View style={styles.row}>
          <InputFieldNumeric
            onChangeText={(value) => updateWorkloadHours(+value)}
            value={
              inputData.workloadPerWeekHours
                ? Math.floor(inputData.workloadPerWeekHours / 60).toString()
                : "0"
            }
            inputUnit="Std."
          />
          <InputFieldNumeric
            onChangeText={(value) => updateWorkloadMinutes(+value)}
            value={
              inputData.workloadPerWeekMinutes
                ? inputData.workloadPerWeekMinutes.toString()
                : "0"
            }
            inputUnit="min."
          />
        </View>
      </View>
      {onDelete && (
        <View
          style={[
            styles.row,
            { justifyContent: "flex-end", paddingTop: 4, paddingBottom: -8 },
          ]}
        >
          <View style={{ flex: 1 }} />
          <Pressable
            style={styles.options}
            onPress={() => onDelete(inputData.id)}
          >
            <LabelS
              style={[styles.errorMessage, { textDecorationLine: "underline" }]}
            >
              Lerneinheit entfernen
            </LabelS>
            <Trash2 size={14} color={COLORTHEME.light.danger} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    width: "100%",
    backgroundColor: COLORTHEME.light.grey1,
    borderRadius: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    gap: 5,
  },
  row: {
    flexGrow: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    gap: 16,
  },
  options: {
    gap: 8,
    padding: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dateRowWrapper: {
    flexGrow: 1,
    flexBasis: 65,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  workloadRowContainer: {
    gap: 5,
    flexDirection: "column",
    backgroundColor: "transparent",
  },
  errorMessage: {
    color: COLORTHEME.light.danger,
    fontSize: 12,
    textAlign: "left",
  },
});
