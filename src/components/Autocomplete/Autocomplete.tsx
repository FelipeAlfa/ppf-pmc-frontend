"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import useDropdown from '@/hooks/useDropdown';
import LoadingBar from '../LoadingBar/LoadingBar';
import {
  autocompleteVariants,
  groupOptionsVariants,
  labelVariants,
  optionsVariants,
  optionVariants,
} from './Autocomplete.variants';

type AutocompleteOption<D> = {
  label: string;
  data: D;
  group?: string;
};

interface AutocompleteProps<D> {
  value: string;
  label?: string;
  disabled?: boolean;
  options?: AutocompleteOption<D>[] | Promise<AutocompleteOption<D>[]> | null;
  renderOption?(option: AutocompleteOption<D>, index: number): React.ReactNode;
  onChange?(value: string): void;
  onSelect?(selectedOption: AutocompleteOption<D>): void;
}

export default function Autocomplete<D>({
  value,
  label,
  disabled = false,
  options,
  renderOption,
  onChange,
  onSelect
}: AutocompleteProps<D>) {
  const autocompleteId = useId();
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { dropdownRef, isOpen, open, close } = useDropdown<HTMLDivElement>();
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [resolvedOptions, setResolvedOptions] = useState<{
    source: Promise<AutocompleteOption<D>[]> | null;
    options: AutocompleteOption<D>[];
  }>({
    source: null,
    options: [],
  });
  const optionsPromise = options instanceof Promise ? options : null;

  const isLoading = Boolean(
    optionsPromise && resolvedOptions.source !== optionsPromise
  );

  const visibleOptions = useMemo(() => {
    if (Array.isArray(options)) {
      return options;
    }
    if (optionsPromise === resolvedOptions.source) {
      return resolvedOptions.options;
    }

    return [];
  }, [options, optionsPromise, resolvedOptions]);

  const groupedOptions = useMemo(() => {
    const ungroupedOptions: AutocompleteOption<D>[] = [];
    const namedGroups = new Map<string, AutocompleteOption<D>[]>();

    visibleOptions.forEach((option) => {
      const groupName = option.group?.trim() || null;

      if (!groupName) {
        ungroupedOptions.push(option);
        return;
      }

      const groupOptions = namedGroups.get(groupName) ?? [];

      groupOptions.push(option);
      namedGroups.set(groupName, groupOptions);
    });

    const groups = [
      ...(ungroupedOptions.length
        ? [{ name: null, options: ungroupedOptions }]
        : []),
      ...Array.from(namedGroups, ([name, groupOptions]) => ({
        name,
        options: groupOptions,
      })),
    ];
    let optionIndex = 0;

    return groups.map((group) => ({
      name: group.name,
      options: group.options.map((option) => ({
        option,
        index: optionIndex++,
      })),
    }));
  }, [visibleOptions]);

  const optionsCount = useMemo(() => (
    groupedOptions.reduce((count, group) => count + group.options.length, 0)
  ), [groupedOptions]);

  const canOpenDropdown = value.length > 1 && (isLoading || optionsCount > 0);
  const dropdownIsOpen = isOpen && canOpenDropdown;
  const listboxId = `${autocompleteId}-listbox`;
  const inputId = `${autocompleteId}-input`;
  const highlightedOptionIsValid = dropdownIsOpen
    && highlightedIndex >= 0
    && highlightedIndex < optionsCount;
  const activeOptionId = highlightedOptionIsValid
    ? `${autocompleteId}-option-${highlightedIndex}`
    : undefined;

  useEffect(() => {
    if (!optionsPromise) return;

    let active = true;

    optionsPromise
      .then((nextOptions) => {
        if (active) {
          setResolvedOptions({
            source: optionsPromise,
            options: nextOptions,
          });
        }
      })
      .catch(() => {
        if (active) {
          setResolvedOptions({
            source: optionsPromise,
            options: [],
          });
        }
      });

    return () => {
      active = false;
    };
  }, [optionsPromise]);

  useEffect(() => {
    if (!highlightedOptionIsValid) return;

    optionRefs.current[highlightedIndex]?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, [highlightedIndex, highlightedOptionIsValid]);
  
  const getOptionByIndex = useCallback((index: number) => {
    for (const group of groupedOptions) {
      const groupedOption = group.options.find((item) => item.index === index);

      if (groupedOption) return groupedOption.option;
    }
  }, [groupedOptions]);

  const openDropdown = useCallback(() => {
    setHighlightedIndex(-1);
    open();
  }, [open]);

  const closeDropdown = useCallback(() => {
    setHighlightedIndex(-1);
    close();
  }, [close]);

  const selectOption = useCallback((selectedOption: AutocompleteOption<D>) => {
    onSelect?.(selectedOption);
    closeDropdown();
  }, [closeDropdown, onSelect]);

  const onChangeEvent = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    openDropdown();
    onChange?.(e.target.value);
  }, [onChange, openDropdown]);

  const onFocusEvent = useCallback(() => {
    if (canOpenDropdown) {
      openDropdown();
    }
  }, [canOpenDropdown, openDropdown]);

  const onKeyDownEvent = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();

      if (!dropdownIsOpen) {
        openDropdown();
        return;
      }
      
      setHighlightedIndex((prev) => {
        if (!optionsCount) return -1;
        const nextIndex = prev + 1;
        return nextIndex >= optionsCount ? 0 : nextIndex;
      });
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();

      if (!dropdownIsOpen) {
        openDropdown();
        return;
      }

      setHighlightedIndex((prev) => {
        if (!optionsCount) return -1;
        const nextIndex = prev - 1;
        return nextIndex < 0 ? optionsCount - 1 : nextIndex;
      });
    }
    else if (e.key === 'Enter' && highlightedOptionIsValid) {
      const selectedOption = getOptionByIndex(highlightedIndex);

      if (selectedOption) {
        e.preventDefault();
        e.stopPropagation();
        selectOption(selectedOption);
      }
    }
    else if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
    }
  }, [
    closeDropdown,
    dropdownIsOpen,
    getOptionByIndex,
    highlightedIndex,
    highlightedOptionIsValid,
    openDropdown,
    optionsCount,
    selectOption,
  ]);

  return (
    <div ref={dropdownRef} className={autocompleteVariants({ open: dropdownIsOpen })}>
      <div className="flex flex-col gap-1">
        { label && (
          <label className={labelVariants({ hidden: !!value })} htmlFor={inputId}>
            {label}
          </label>
        ) }
        <input
          id={inputId}
          className="h-10 w-full rounded-xs border-0 bg-white px-4 text-left text-sm tracking-wider text-foreground outline-none font-liberation-sans disabled:cursor-not-allowed disabled:bg-foreground/5 disabled:text-foreground/50"
          type="text"
          value={value}
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={dropdownIsOpen}
          aria-activedescendant={activeOptionId}
          aria-label={label ? undefined : 'Search'}
          onKeyDown={onKeyDownEvent}
          onFocus={onFocusEvent}
          onChange={onChangeEvent}
          disabled={disabled}
        />
      </div>
      { dropdownIsOpen && isLoading && (
        <div className="pointer-events-none absolute bottom-0 left-0 w-full p-0">
          <LoadingBar />
        </div>
      ) }
      <div className="absolute top-full left-0 right-0 w-full bg-white shadow-lg">
        <ul
          id={listboxId}
          className={optionsVariants({ open: dropdownIsOpen })}
          role="listbox"
          aria-busy={isLoading}>
          { dropdownIsOpen && groupedOptions.map((group, groupIndex) => {
            const groupTitleId = `${autocompleteId}-group-${groupIndex}`;

            return (
              <li
                key={group.name ?? 'ungrouped'}
                className="m-0 p-0"
                role="presentation">
                { group.name && (
                  <div
                    id={groupTitleId}
                    className="p-4 text-[15px] font-semibold uppercase tracking-wider text-foreground opacity-40 font-liberation-sans">
                    {group.name}
                  </div>
                ) }
                <ul
                  className={groupOptionsVariants({ separated: groupIndex > 0 })}
                  role={group.name ? 'group' : 'presentation'}
                  aria-labelledby={group.name ? groupTitleId : undefined}>
                  { group.options.map(({ option, index }) => {
                    const optionIsHighlighted = index === highlightedIndex;

                    return (
                      <li
                        ref={(element) => {
                          optionRefs.current[index] = element;
                        }}
                        id={`${autocompleteId}-option-${index}`}
                        key={index}
                        role="option"
                        aria-selected={optionIsHighlighted}
                        className={optionVariants({ highlighted: optionIsHighlighted })}
                        onMouseDown={(event) => event.preventDefault()}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        onClick={() => selectOption(option)}>
                        { renderOption ? renderOption(option, index) : option.label }
                      </li>
                    );
                  }) }
                </ul>
              </li>
            );
          }) }
        </ul>
      </div>
    </div>
  );
}
