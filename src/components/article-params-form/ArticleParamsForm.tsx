import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { OnClick } from 'src/ui/arrow-button/ArrowButton';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
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

interface IArticleParamsForm {
	openState: boolean;
	handlerToggleOpen: OnClick;
}

export const ArticleParamsForm = ({
	openState,
	handlerToggleOpen,
}: IArticleParamsForm) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Обработчик изменения компонентов: select и radiogroup
	const handlerComponentChange = (field: string) => {
		return (value: OptionType) => {
			setFormState((current) => ({
				...current,
				[field]: value,
			}));
		};
	};

	return (
		<>
			<ArrowButton isOpen={openState} onClick={handlerToggleOpen} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: openState,
				})}>
				<form className={styles.form}>
					<Text as='h1' size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handlerComponentChange('fontFamilyOption')}
					/>

					<RadioGroup
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='Размер шрифта'
						onChange={handlerComponentChange('fontSizeOption')}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handlerComponentChange('fontColor')}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handlerComponentChange('backgroundColor')}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
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
