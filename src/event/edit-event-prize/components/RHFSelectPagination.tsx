import { Controller, useFormContext } from 'react-hook-form';
import { GroupBase, StylesConfig, components, ControlProps } from 'react-select';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import React, { useState } from 'react';

interface ISearchParams {
  except?: number;
  page?: number;
  size?: number;
}

type IProps = {
  name: string;
  getAsyncData: any;
  placeholder: string;
  searchParams?: ISearchParams;
};

const { ValueContainer, Placeholder } = components;

const CustomValueContainer = ({ children, ...props }: any) => {
  return (
    <ValueContainer {...props}>
      <Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </Placeholder>
      {React.Children.map(children, (child) =>
        child && child.key !== 'placeholder' ? child : null
      )}
    </ValueContainer>
  );
};

export const RHFSelectPagitnation = ({
  name,
  getAsyncData,
  placeholder,
  searchParams,
}: IProps) => {
  const { control } = useFormContext();
  const loadOptions = async (
    search: string,
    loadedOptions: any,
    { page }: { page: number }
  ) => {
    const response = await getAsyncData({
      ...searchParams,
      page: page,
      searchText: search,
    });

    const hasMore = page < response?.data?.pagination.totalPages;
    const optionSelects = response.data?.response.map((item: any) => {
      return {
        value: item.id,
        label: item.description,
      };
    });
    return {
      options: optionSelects,
      hasMore: hasMore,
      additional: {
        page: page + 1,
      },
    };
  };
  const [isFocus, setFocus] = useState<boolean>(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <AsyncPaginate
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            debounceTimeout={1000}
            placeholder={placeholder}
            value={value}
            additional={{ page: 0 }}
            isSearchable
            loadOptions={
              loadOptions as unknown as LoadOptions<
                unknown,
                GroupBase<unknown>,
                { page: number }
              >
            }
            closeMenuOnSelect={false}
            onChange={onChange}
            styles={colourStyles(isFocus)}
            components={{
              ValueContainer: CustomValueContainer,
            }}
          />
        );
      }}
    />
  );
};

const colourStyles = (isFocus: boolean) => {
  const styles: StylesConfig = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: 'primary',
      borderRadius: '6px',
      minHeight: '60px',
      // opacity: (isFocus as unknown as ControlProps<boolean>) ? 1 : 0.6,
      borderColor: (isFocus as unknown as ControlProps<boolean>)
        ? '#00ab55!important'
        : !state.hasValue || !state.selectProps.inputValue
        ? '#e2dbdb'
        : '#00ab55!important',
      color: 'black!important',
    }),
    container: (provided, state) => ({
      ...provided,
      marginTop: 0.025,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      overflow: 'visible',
      padding: 10,
      color: (isFocus as unknown as ControlProps<boolean>) && 'black!important',
    }),
    // menuList: (provided) => ({
    //   ...provided,
    //   maxHeight: '300px!important',
    //   position: 'relative',
    //   zIndex: 1,
    // }),

    placeholder: (base, state) => ({
      ...base,
      position: 'absolute',
      backgroundColor:
        state.hasValue ||
        state.selectProps.inputValue ||
        (isFocus as unknown as ControlProps<boolean>)
          ? 'white'
          : 'primary',
      top: state.hasValue
        ? '-22px'
        : state.selectProps.inputValue
        ? '-22px'
        : (isFocus as unknown as ControlProps<boolean>)
        ? '-22px'
        : '10%',
      transition: 'top 0.2s, font-size 0.2s',
      fontSize:
        (state.hasValue ||
          state.selectProps.inputValue ||
          (isFocus as unknown as ControlProps<boolean>)) &&
        12,
      color: (isFocus as unknown as ControlProps<boolean>)
        ? '#00ab55'
        : state.hasValue || state.selectProps.inputValue
        ? 'grey'
        : '#a09696',
    }),
  };
  return styles;
};
