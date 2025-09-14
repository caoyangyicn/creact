import React, {createRef, FC, ReactElement, RefObject, useEffect, useRef, useState} from "react";
import Input, {InputProps} from "../Input/input";
import Icon from "../Icon/icon";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {useDebounce} from "../../hooks/useDebounce";
import {useClickOutside} from "../../hooks/useClickOutside";

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        fetchSuggestions,
        onSelect,
        value,
        renderOption,
        ...restProps
    } = props;

    const [InputValue, setInputValue] = useState(value);
    const debouncedValue = useDebounce(InputValue, 500)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const [highLightIndex, setHighLightIndex] = useState(-1);
    const toSearch = useRef(false);
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    }

    useEffect(() => {
        if (debouncedValue && toSearch.current) {
            const results = fetchSuggestions(debouncedValue as string);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(data => {
                    setLoading(false);
                    setSuggestions(data);
                })
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
        }
    }, [debouncedValue])
    const autoCompleteRef = createRef<HTMLElement>();
    useClickOutside(autoCompleteRef as RefObject<HTMLElement>, () => {
        setSuggestions([]);
    });
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                if (suggestions[highLightIndex]) {
                    handleSelect(suggestions[highLightIndex]);
                }
                break;
            case 'ArrowUp':
                setHighLightIndex(highLightIndex - 1 < 0 ? 0 : highLightIndex - 1);
                break;
            case 'ArrowDown':
                setHighLightIndex(highLightIndex + 1 >= suggestions.length ? suggestions.length - 1 : highLightIndex + 1);
                break;
            case 'Escape':
                setSuggestions([]);
                break;
            default:
                break;
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        toSearch.current = true;
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setSuggestions([]);
        toSearch.current = false;
        if (onSelect) {
            onSelect(item);
        }
    }
    const generateDropdown = () => {

        return (
            <ul>
                {loading &&
                    <div className="suggstions-loading-icon">
                        <Icon icon={faSpinner} spin/>
                    </div>
                }
                {suggestions.map((item, index) => {
                    const cnames = index === highLightIndex ? 'suggestion-item is-active' : 'suggestion-item';
                    return <li key={index} className={cnames}
                               onClick={() => handleSelect(item)}>{renderTemplate(item)}</li>
                })}
            </ul>
        )
    }

    return (
        <div className="cyy-auto-complete" ref={autoCompleteRef as React.RefObject<HTMLDivElement>}>
            <Input
                value={InputValue}
                onChange={handleChange}
                {...restProps}
                onKeyDown={handleKeyDown}
            ></Input>
            {suggestions.length > 0 && generateDropdown()}
        </div>
    )
}

export default AutoComplete;