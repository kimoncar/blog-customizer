import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { OnClick } from 'src/ui/arrow-button/ArrowButton';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

interface IArticleParamsForm {
	openState: boolean;
	handlerToggleOpen: OnClick;
}

export const ArticleParamsForm = ({
	openState,
	handlerToggleOpen,
}: IArticleParamsForm) => {
	return (
		<>
			<ArrowButton isOpen={openState} onClick={handlerToggleOpen} />
			<aside
				className={clsx({
					[styles.container]: true,
					[styles.container_open]: openState,
				})}>
				<form className={styles.form}>
					<Text
						as='h1'
						size={31}
						weight={800}
						uppercase={true}
						dynamicLite={true}>
						Задайте параметры
					</Text>

					<Select title='шрифт' selected={null} options={[]} />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
