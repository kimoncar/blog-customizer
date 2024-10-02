import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

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

	function toggleOpen() {
		setIsOpen((value) => !value);
	}

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

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
