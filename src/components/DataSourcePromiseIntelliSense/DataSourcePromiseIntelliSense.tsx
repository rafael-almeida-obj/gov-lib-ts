/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useState,
} from "react";
import { Autocomplete } from "@mui/material";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import _ from "lodash";

import {
  intellisenseDefaults,
  isOptionEqualToValue,
  renderInput,
} from "../IntelliSenseUtils/IntellisenseUtils";

import {
  DataSourcePromiseIntelliSenseProps,
  OptionType,
} from "../IntelliSenseUtils/types";

const DataSourcePromiseIntelliSense = forwardRef(
  (props: DataSourcePromiseIntelliSenseProps<any>, ref) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [options, setOptions] = useState<OptionType[]>([]);
    const {
      dataSource,
      filter,
      formatter,
      onAfterLoad,
      onProcessing,
      labelKey = "name",
      valueKey = "id",
      ...rest
    } = props;

    const renderInputProps = {
      renderInput: _.defaultTo(rest.renderInput, (params: any) =>
        renderInput(params, props, isProcessing, props.margin, props.size)
      ),
    };

    const loadDataOptions = (data: AxiosResponse<any>) => {
      if (_.isArray(data)) {
        const remapData = data
          .filter((item) => (_.isFunction(filter) ? filter(item) : true))
          .map((item) =>
            _.isFunction(formatter)
              ? formatter(item)
              : {
                  label: item[labelKey],
                  value: item[valueKey],
                  data: item,
                }
          );
        setOptions(_.flatten(remapData));
      } else if (_.isObject(data)) {
        setOptions(
          (_.isFunction(formatter) ? formatter(data) : []).filter((item: any) =>
            _.isFunction(filter) ? filter(item) : true
          )
        );
      }
    };

    const loadData = () => {
      if (_.isNil(dataSource)) {
        setOptions([]);
        return;
      }

      setIsProcessing(true);
      (_.isFunction(dataSource) ? dataSource() : dataSource)
        .then((response: AxiosResponse<any>) => {
          if (!_.isNil(response.data)) loadDataOptions(response.data);
          else loadDataOptions(response);
        })
        .catch(() => toast.error("Erro ao buscar dados para o autocomplete."))
        .finally(() => setIsProcessing(false));
    };

    function notifyProcessing() {
      if (_.isFunction(onProcessing)) onProcessing(isProcessing);
    }

    function notifyOptionsLoaded() {
      if (_.isFunction(onAfterLoad)) onAfterLoad(options);
    }

    useImperativeHandle(ref, () => ({
      getOptions() {
        return options;
      },
      appendOption(option: OptionType) {
        if (
          _.isObject(option) &&
          _.findIndex(options, ({ value }) =>
            _.isString(value) && _.isString(option.value)
              ? value.toUpperCase() === option.value.toUpperCase()
              : value === option.value
          ) < 0
        ) {
          setOptions([...options, option]);
          return true;
        }

        return false;
      },
    }));

    useEffect(() => {
      loadData();

      return () => setIsProcessing(false);
    }, [dataSource]);

    useEffect(notifyProcessing, [isProcessing]);

    useEffect(notifyOptionsLoaded, [options]);

    return (
      <Autocomplete
        {...intellisenseDefaults}
        {...rest}
        {...renderInputProps}
        disabled={isProcessing || rest.disabled || false}
        loading={isProcessing}
        options={options}
        value={!_.isNil(rest.value) ? rest.value : null}
        isOptionEqualToValue={isOptionEqualToValue}
      />
    );
  }
);

export default DataSourcePromiseIntelliSense;
