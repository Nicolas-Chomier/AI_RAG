// React core
import React, { ReactNode } from 'react';
// External modules / Third-party libraries
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { Controller, useForm } from 'react-hook-form';
// Local components
import {
	Button,
	Flex,
	IconButton,
	Popover,
	Select,
	Slider,
	Text,
} from '@radix-ui/themes';
import { Settings2 } from 'lucide-react';
// Hooks and utilities
// Configuration
import { settings } from '@/app/utils/constant/RAGSettings';
import {
	RAGSettingSchema,
	RAGSettingSchemaProps,
} from '@/app/utils/schema/RAGSettingSchema';
// Styles
import styles from './SettingsPanel.module.css';

export const SettingsPanel: React.FC = () => {
	// React hook form
	const {
		handleSubmit,
		control,
		formState: { isValid },
	} = useForm<RAGSettingSchemaProps>({
		defaultValues: {
			file_size: [7],
			query_result: [4],
			chunk_size: '1000',
			chunk_overflow: '10',
			filters: 'safe',
			model: 'dolphin-llama3',
			temperature: '0.5',
			retrival_algorithme: 'Cosine_similarity',
		},
		mode: 'onChange',
		resolver: zodResolver(RAGSettingSchema),
	});

	// Validation et envoie du formaulaire au composant parent et au store
	const submitData = async (data: RAGSettingSchemaProps) => {
		console.log(data);
	};

	return (
		<Popover.Root>
			<Popover.Trigger>
				<IconButton
					radius='large'
					color='gray'
					variant='solid'
					highContrast
				>
					<Settings2 size={20} />
				</IconButton>
			</Popover.Trigger>
			<Popover.Content width='360px'>
				<form
					name={'RAG_setting_form_management'}
					onSubmit={handleSubmit(submitData)}
					className={styles.form}
				>
					<SimpleWrapper title={'Upload'}>
						<Controller
							control={control}
							name='file_size'
							render={({ field: { onChange, value, name } }) => (
								<SliderField
									value={value}
									onChange={onChange}
									name={name}
								/>
							)}
						/>
					</SimpleWrapper>

					<SimpleWrapper title={'Split'}>
						<Controller
							control={control}
							name='chunk_size'
							render={({ field: { onChange, value, name } }) => (
								<InputNumberField
									onChange={onChange}
									name={name}
									min={10}
									value={value}
								/>
							)}
						/>

						<Controller
							control={control}
							name='chunk_overflow'
							render={({ field: { onChange, value, name } }) => (
								<InputNumberField
									onChange={onChange}
									name={name}
									value={value}
								/>
							)}
						/>

						<Controller
							control={control}
							name='filters'
							render={({ field: { onChange, value, name } }) => (
								<SelectField
									value={value}
									onChange={onChange}
									name={name}
								/>
							)}
						/>
					</SimpleWrapper>

					<SimpleWrapper title={'ChromaDB'}>
						<Controller
							control={control}
							name='query_result'
							render={({ field: { onChange, value, name } }) => (
								<SliderField
									value={value}
									onChange={onChange}
									name={name}
								/>
							)}
						/>

						<Controller
							control={control}
							name='retrival_algorithme'
							render={({ field: { onChange, value, name } }) => (
								<SelectField
									value={value}
									onChange={onChange}
									name={name}
								/>
							)}
						/>
					</SimpleWrapper>

					<SimpleWrapper title={'Ollama'}>
						<Controller
							control={control}
							name='model'
							render={({ field: { onChange, value, name } }) => (
								<SelectField
									value={value}
									onChange={onChange}
									name={name}
								/>
							)}
						/>

						<Controller
							control={control}
							name='temperature'
							render={({ field: { onChange, value, name } }) => (
								<InputNumberField
									onChange={onChange}
									name={name}
									min={0}
									step={0.1}
									value={value}
								/>
							)}
						/>
					</SimpleWrapper>
					{isValid && <Button type='submit'>Submit</Button>}
				</form>
			</Popover.Content>
		</Popover.Root>
	);
};

type SimpleWrapperProps = {
	children: ReactNode;
	title: string;
};

// Category wrapper
export const SimpleWrapper: React.FC<SimpleWrapperProps> = ({
	children,
	title,
}) => {
	return (
		<Flex direction={'column'} className={styles.wrapper}>
			<Text weight={'bold'}>{title}</Text>
			<div className={styles.content}>{children}</div>
		</Flex>
	);
};

// Slider
type SliderFieldProps = {
	value: number[];
	onChange: (...event: any[]) => void;
	name: string;
};

const SliderField: React.FC<SliderFieldProps> = ({ value, onChange, name }) => {
	return (
		<div className={styles.slider}>
			<Flex gap='2' direction={'row'}>
				<Text>{name}</Text>
				<Text color='indigo'>{value[0]}</Text>
			</Flex>
			<Slider
				defaultValue={value}
				variant='classic'
				onValueChange={(newValue) => onChange(newValue)}
				name={name}
				min={1}
				max={10}
			/>
		</div>
	);
};

// Select
type SettingsKey = keyof typeof settings;

type ModelFieldProps = {
	value: string | number;
	onChange: (...event: any[]) => void;
	name: SettingsKey;
};

const SelectField: React.FC<ModelFieldProps> = ({ value, onChange, name }) => {
	return (
		<Flex gap='10' direction={'column'}>
			<Text>{name}</Text>
			<Select.Root
				size='1'
				defaultValue={value.toString()} // Convertir en string explicitement
				onValueChange={(value: string) => onChange(value)}
				name={name}
			>
				<Select.Trigger />
				<Select.Content className={styles.selectContent}>
					{settings[name].map((option: string) => (
						<Select.Item value={option} key={option}>
							{option}
						</Select.Item>
					))}
				</Select.Content>
			</Select.Root>
		</Flex>
	);
};

// InputNumber
type InputNumberFieldProps = {
	value: string | number;
	onChange: (...event: any[]) => void;
	name: string;
	min?: number;
	max?: number;
	step?: number;
};

export const InputNumberField: React.FC<InputNumberFieldProps> = ({
	value,
	onChange,
	name,
	min = 0,
	max = 10000,
	step = 1,
}) => {
	return (
		<Flex gap='10' direction={'column'}>
			<Text>{name}</Text>
			<input
				type='number'
				defaultValue={value}
				onChange={(event) => {
					const newValue = event.target.value;
					onChange(newValue);
				}}
				name={name}
				min={min}
				max={max}
				step={step}
				value={value}
				className={styles.input}
			/>
		</Flex>
	);
};
