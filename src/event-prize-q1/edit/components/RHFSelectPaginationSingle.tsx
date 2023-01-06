import { Controller, useFormContext } from 'react-hook-form';
import { GroupBase, StylesConfig, components, ControlProps } from 'react-select';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import React, { useEffect, useState } from 'react';
import { getCrmTransactionById } from 'src/event-prize-q1/services';
import { dispatch } from 'src/common/redux/store';
import { setCrmTypeIdEdit } from 'src/event-prize-q1/eventPrizeQ1.slice';

interface ISearchParams {
    except?: number;
    page?: number;
    size?: number;
}

interface ICustomValue {
    value: number;
    label: string;
}

type IProps = {
    name: string;
    getAsyncData: any;
    placeholder: string;
    searchParams?: ISearchParams;
    error: any;
    defaultvalue: number;
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

export const RHFSelectPaginationSingle = ({
    name,
    getAsyncData,
    placeholder,
    searchParams,
    error,
    defaultvalue
}: IProps) => {

    useEffect(() => {
        const response = getCrmTransactionById(defaultvalue).then((res) => {
            const data = res?.data?.response
            setCustomValue({value: data.id, label: data.description})
        });
    }, [defaultvalue])

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

        const data = response.data?.response.filter((item: any) => {
            if(item.id == defaultvalue) setCustomValue({value: item.id, label: item.name})
        })

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
    const [customValue, setCustomValue] = useState<ICustomValue>()

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
                        value={customValue ? customValue : value}
                        additional={{ page: 0 }}
                        loadOptions={
                            loadOptions as unknown as LoadOptions<
                                unknown,
                                GroupBase<unknown>,
                                { page: number }
                            >
                        }
                        onChange={(value) => {
                            setCustomValue({value: value?.value, label: value?.label})
                            dispatch(setCrmTypeIdEdit(value?.value))
                        }}
                        styles={colourStyles(isFocus, error, name)}
                        components={{
                            ValueContainer: CustomValueContainer,
                        }}
                    />
                );
            }}
        />
    );
};

const colourStyles = (isFocus: boolean, error: any, name: string) => {
    const styles: StylesConfig = {
        control: (styles, state) => ({
            ...styles,
            backgroundColor: 'primary',
            borderRadius: '8px',
            boxShadow: 'none',
            '&:hover': {
                border: '1px solid black'
            },
            border: error[name]?.message
                ? '1.5px solid #ff4842!important'
                : (isFocus as unknown as ControlProps<boolean>)
                    ? '1px solid #00ab55!important'
                    : !state.hasValue || !state.selectProps.inputValue
                        ? '1px solid #e2dbdb'
                        : '1px solid #00ab55!important',
        }),
        container: (provided, state) => ({
            ...provided,
        }),

        valueContainer: (provided, state) => ({
            ...provided,
            overflow: 'visible',
            padding: 10,
            color: (isFocus as unknown as ControlProps<boolean>) && 'black!important',
        }),

        placeholder: (base, state) => ({
            ...base,
            position: 'absolute',
            paddingInline:
                (state.hasValue ||
                    state.selectProps.inputValue ||
                    (isFocus as unknown as ControlProps<boolean>)) &&
                '8px',
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
            color: error[name]?.message
                ? '#ff4842!important'
                : (isFocus as unknown as ControlProps<boolean>)
                    ? '#00ab55'
                    : state.hasValue || state.selectProps.inputValue
                        ? '#919EAB'
                        : '#919eab',
        }),
    };
    return styles;
};