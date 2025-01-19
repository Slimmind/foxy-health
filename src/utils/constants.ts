export const appColors = [
	'102, 51, 153',
	'255, 121, 0',
	'150,0,0',
	'0,120,0',
	'0,0,150',
	'46, 139, 130',
	'150, 150, 150',
];

export type FormConfigItemType = {
	id: string;
	type: string;
	label?: string;
	placeholder?: string;
	description?: string;
};

export type FormConfigItemWrapType = {
	id: string;
	type: string;
	title: string;
	subtitle?: string;
	description?: string;
	items: FormConfigItemWrapType[];
};

export const FormItemTypes = {
	STEP: 'step',
	BLOCK: 'block',
	COLUMN: 'column',
	FIELDSET: 'fieldset',
	FIELD: 'input',
	LARGE_FIELD: 'textarea',
	CHECKBOX: 'checkbox',
	RADIO_BUTTON: 'radio',
};

export type ColorOptionType = {
	isActive: boolean;
	color: string;
};

export type MenuItemType = {
	path: string;
	name: string;
};

export const FormViews = {
	LOGIN: 'login',
	SIGN_UP: 'sign_up',
};

export type PanelType = 'menu' | 'search' | 'auth' | 'add' | 'time' | null;

export const PanelTypes = {
	MENU: 'menu',
	SEARCH: 'search',
	AUTH: 'auth',
	ADD: 'add',
	TIME: 'time',
};

export type ValidationRule = {
	type: 'string' | 'number';
	required?: boolean;
	positive?: boolean;
	integer?: boolean;
	min?: number;
	max?: number;
	message?: {
		required?: string;
		positive?: string;
		integer?: string;
		min?: string;
		max?: string;
	};
};

export type InitialValuesType = Record<string, string | number>;

export type FormNodeType = {
	node: 'field' | 'group' | 'set';
	id: string;
	title?: string;
	items?: FormNodeType[];
	type?: string; // Optional for field types
	name?: string; // Optional for field names
	label?: string; // Optional for field labels
	description?: string; // Optional for field descriptions
};

// Universal FormConfigType
export type FormConfigType = {
	formId: string;
	formTitle: string;
	formSubtitle: string;
	formDescription: string;
	initialValues: InitialValuesType;
	validationRules?: {
		[key: string]: ValidationRule; // Validation rules for each field
	};
	nodes: FormNodeType[];
};

export const PromptParts = {
	RESUME: '***Краткое резюме:***',
	SUMMARY: '***Итог:***',
	RECOMMENDATIONS: '***Общие рекомендации:***',
	GROCERIES: '***Продукты к употреблению:***',
};

export const RenderTypes = {
	PARAGRAPH: 'paragraph',
	ORDERED_LIST: 'ordered-list',
	UNORDERED_LIST: 'unordered-list',
	TITLE: 'title',
	SUBTITLE: 'sub-title',
};

export const responseTemplate = `***Краткое резюме:***

Пациент мужского пола, 37 лет, с ростом 190 см и весом 90 кг. У пациента наблюдается значительно повышенный уровень инсулина в крови, повышенный уровень глюкозы и холестерина, а также имеются небольшие гемангиомы на печени и мелкие кисты. Артериальное давление находится в пределах нормы (115/78).

***ANALYSIS***

Исходя из предоставленных данных, пациент столкнулся с проблемами, связанными с метаболическими нарушениями и наличием образований на печени. Высокий уровень инсулина, глюкозы и холестерина может свидетельствовать о предиабете и нарушениях обмена веществ. Наличие гемангиом и кист на печени также требует внимания специалистов для дальнейшего наблюдения и контроля.

***Общие рекомендации:***

1. Обратиться к эндокринологу для дальнейшего обследования и консультации по поводу повышенного уровня инсулина, глюкозы и холестерина.
2. Пройти обследование у гастроэнтеролога для оценки состояния печени и дальнейшего наблюдения за гемангиомами и кистами.
3. Пройти консультацию у диетолога для разработки индивидуального плана питания, учитывающего особенности состояния здоровья.

***Продукты к употреблению:***

Для улучшения здоровья пациенту рекомендуется употреблять следующие продукты:
- Овощи и зелень (брокколи, шпинат, цветная капуста)
- Фрукты (ягоды, цитрусовые, яблоки)
- Орехи и семена (миндаль, льняные семена, чиа)
- Рыба (лосось, сардины, треска)
- Оливковое масло

***Итог:***

Для улучшения состояния здоровья пациенту необходимо обратиться к специалистам для дальнейшего обследования и назначения необходимого лечения. Важно следить за питанием, употреблять полезные продукты, контролировать уровень глюкозы, холестерина и инсулина в крови. Регулярные физические упражнения также могут быть полезны для поддержания общего здоровья и профилактики метаболических заболеваний.`;
