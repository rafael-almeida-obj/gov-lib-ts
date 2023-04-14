import {
  AutocompleteProps,
  SxProps,
  TextFieldProps,
  Theme,
} from "@mui/material";

export type MuiErrorState = {
  error: boolean;
  helperText: string;
};

export type DataSourcePromiseIntelliSenseProps<T> = {
  dataSource?: any;
  filter?: any;
  formatter?: any;
  onProcessing?: any;
  label?: string;
  renderInput?: any;
  labelKey?: string;
  valueKey?: string;
  onAfterLoad?: any;
  validation?: MuiErrorState;
  margin?: "dense" | "none" | "normal";
  sxInput?: SxProps<Theme> | undefined;
} & Omit<
  AutocompleteProps<
    T,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >,
  "renderInput" | "options"
> &
  Omit<TextFieldProps, "onChange">;

export type OptionType = {
  label: string;
  value: number | string;
  data?: any;
};

export type GenericIntellisenseProps = {
  options: OptionType[];
  validation?: MuiErrorState;
  sxInput?: SxProps<Theme> | undefined;
} & Omit<
  AutocompleteProps<
    any,
    boolean | undefined,
    boolean | undefined,
    boolean | undefined
  >,
  "renderInput" | "options"
> &
  Omit<TextFieldProps, "onChange">;
