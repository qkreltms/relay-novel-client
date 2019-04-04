export enum Directions {
    Start = "start",
    End = "end",
    Top = "top",
    Bottom = "bottom"
}

export interface RadioContents {
  value: string;
  label: string;
  labelPlacement: Directions
}

export const newRadioContents = () => {
  return {
      value: "",
      label: "",
      labelPlacement: Directions[0]
  } as RadioContents;
};
