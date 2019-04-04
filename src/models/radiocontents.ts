export enum Directions {
    Start = "start",
    End = "end",
    Top = "top",
    Bottom = "bottom"
}

export interface RadioContents {
  value: string;
  label: string;
  labelPlacement: Directions;
}

export const newRadioContents = () => {
  return {
      value: "100",
      label: "",
      labelPlacement: Directions[0],
  } as RadioContents;
};
