import React from "react";
import {
  AutocompleteRenderInputParams,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";

import {
  DataSourcePromiseIntelliSenseProps,
  GenericIntellisenseProps,
  OptionType,
} from "./types";

const getInputProps = (
  params: AutocompleteRenderInputParams,
  loading: boolean
) => {
  return {
    ...params.InputProps,
    endAdornment: (
      <InputAdornment position="end">
        {loading ? <CircularProgress size={16} /> : null}
        {params.InputProps.endAdornment}
      </InputAdornment>
    ),
  };
};

const getInputLabelProps = (params: AutocompleteRenderInputParams) => {
  return {
    ...params.InputLabelProps,
  };
};

export const intellisenseDefaults = {
  fullWidth: true,
  getOptionLabel: (option: OptionType) => option.label || "",
  loadingText: "Carregando ...",
  openOnFocus: true,
};

export const renderInput = (
  params: AutocompleteRenderInputParams,
  props: GenericIntellisenseProps | DataSourcePromiseIntelliSenseProps<any>,
  loading: boolean,
  margin: "dense" | "none" | "normal" = "dense",
  size: "small" | "medium" | undefined = "small"
) => (
  <TextField
    {...params}
    error={props.validation?.error}
    helperText={props.validation?.helperText}
    sx={props.sxInput}
    InputLabelProps={getInputLabelProps({
      ...params,
      InputLabelProps: { ...props.InputLabelProps },
    })}
    InputProps={getInputProps(
      { ...params, InputProps: { ...params.InputProps, ...props.InputProps } },
      loading
    )}
    inputRef={props.inputRef}
    label={props.label}
    margin={margin}
    size={size}
    variant={props.variant || "outlined"}
  />
);

export const getOptionsKeys = (options: OptionType[]) =>
  options.map(({ value }) => value);

export const getOptionByKey = (options: OptionType[], searchValue: string) =>
  options.find(({ value }) => value === searchValue);

export const getOptionByLabel = (options: OptionType[], searchValue: string) =>
  options.find(({ label }) => label === searchValue);

export const isOptionEqualToValue = (option: OptionType, value: OptionType) =>
  option.value === value.value;
