import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface IArticleParamsForm {
	appState: ArticleStateType;
	setAppState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({
	appState,
	setAppState,
}: IArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formOptions, setFormOptions] = useState<ArticleStateType>(appState);

	// Обработчик изменения выбора компонентов: select и radiogroup
	const handlerComponentChange = (field: string) => {
		return (value: OptionType) => {
			setFormOptions((current) => ({
				...current,
				[field]: value,
			}));
		};
	};

	// Обработчик отправки формы
	const handlerSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setAppState({
			...appState,
			fontFamilyOption: formOptions.fontFamilyOption,
			fontSizeOption: formOptions.fontSizeOption,
			fontColor: formOptions.fontColor,
			backgroundColor: formOptions.backgroundColor,
			contentWidth: formOptions.contentWidth,
		});
	};

	// Обработчик сброса настроек формы и статьи на дефолтные
	const handlerResetToDefault = () => {
		setAppState(defaultArticleState);
		setFormOptions(defaultArticleState);
	};

	// Обработчик клика вне области формы
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: () => setIsOpen(false),
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={rootRef}
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handlerSubmitForm}>
					<Text as='h1' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formOptions.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handlerComponentChange('fontFamilyOption')}
					/>

					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={formOptions.fontSizeOption}
						title='Размер шрифта'
						onChange={handlerComponentChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={formOptions.fontColor}
						options={fontColors}
						onChange={handlerComponentChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formOptions.backgroundColor}
						options={backgroundColors}
						onChange={handlerComponentChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={formOptions.contentWidth}
						options={contentWidthArr}
						onChange={handlerComponentChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handlerResetToDefault}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
