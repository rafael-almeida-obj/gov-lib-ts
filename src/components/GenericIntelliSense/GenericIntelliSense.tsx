import React from "react";
import { Autocomplete } from "@mui/material";

import {
  intellisenseDefaults,
  renderInput,
} from "../IntelliSenseUtils/IntellisenseUtils";

import { GenericIntellisenseProps } from "../IntelliSenseUtils/types";

const GenericIntelliSense = (props: GenericIntellisenseProps) => {
  const { InputProps, InputLabelProps, sxInput, ...rest } = props;
  return (
    <Autocomplete
      {...intellisenseDefaults}
      {...rest}
      renderInput={(params) =>
        renderInput(
          params,
          { ...props, InputProps, InputLabelProps, sxInput },
          false
        )
      }
    />
  );
};

export default GenericIntelliSense;
