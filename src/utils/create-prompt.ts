import { PatientFormType, PromptParts } from './constants';

export const createPrompt = (data: PatientFormType): string => `
	Based on the following patient data:

	Age: ${data.age}
	Gender: ${data.gender}
	Height: ${data.height} cm
	Weight: ${data.weight} kg
	Blood Pressure: ${data.bloodPressure}
	Additional Notes: ${data.notes}
	Please provide a detailed, structured response focused specifically on nutrition and dietary recommendations.

	The structure of the response should be as follows:

	Summary and analysis of the patient's current health and nutritional status.
	A list of personalized recommendations focused on improving the patient’s nutrition and overall health, especially if any problems are identified.
	A list of recommended foods tailored to the patient's needs and nutritional goals.
	Conclusion with advice on lifestyle changes, dietary improvements, physical exercise, and any other health-related suggestions. Be sure to consider the patient’s age, gender, and any relevant health conditions.
	Please use the following markers for structuring the response:

	Insert ${PromptParts.RESUME} before the summary and analysis.
	Insert ${PromptParts.RECOMMENDATIONS} before the list of recommendations.
	Insert ${PromptParts.GROCERIES} before the list of recommended foods.
	Insert ${PromptParts.SUMMARY} before the conclusion.
	`;

// Когда пациент приходит на консультацию к нутрициологу, важно задать ряд вопросов, чтобы получить полную картину его состояния здоровья, питания и образа жизни. Вот список ключевых вопросов, которые помогут вам составить план питания и рекомендации:

// 1. Общие сведения
// Возраст, пол, рост, вес (эти данные помогут рассчитать суточную норму калорий и составить рекомендации)
// Есть ли у вас цели по весу? (например, похудение, набор массы или поддержание текущего веса)
// Есть ли в вашей семье заболевания, связанные с питанием? (например, диабет, сердечно-сосудистые заболевания, ожирение)
// 2. Питание
// Каким обычно бывает ваш завтрак, обед, ужин?
// Как часто вы едите в день? (количество приемов пищи)
// Употребляете ли вы перекусы? Какие именно?
// Как много жидкости вы пьете в день? (вода, кофе, чай, соки, газированные напитки)
// Есть ли у вас аллергии или непереносимость продуктов?
// Какие продукты вы любите или, наоборот, не употребляете вообще?
// Есть ли у вас ограничения в питании? (вегетарианство, веганство, соблюдение постов и т.д.)
// 3. Здоровье и образ жизни
// Есть ли у вас хронические заболевания? (диабет, гипертония, заболевания ЖКТ)
// Принимаете ли вы какие-либо лекарства или добавки?
// Каков ваш уровень физической активности? (сколько раз в неделю вы занимаетесь спортом или ходите пешком)
// Как часто вы испытываете стресс? Как вы с ним справляетесь?
// 4. Пищевые привычки
// Есть ли у вас склонность к перееданию или перекусам на фоне стресса?
// Как часто вы едите вне дома?
// Планируете ли вы свой рацион или питаетесь спонтанно?
// Сколько времени у вас обычно уходит на прием пищи?
// 5. Сон и восстановление
// Сколько часов в сутки вы спите?
// Чувствуете ли вы себя отдохнувшим после сна?
// 6. Психологическое состояние
// Как вы относитесь к своему телу и внешнему виду?
// Есть ли у вас проблемы с пищевым поведением? (например, эмоциональное переедание или недоедание)
// Эти вопросы помогут вам получить комплексное представление о состоянии пациента и его потребностях, что необходимо для составления персонализированных рекомендаций по питанию и образу жизни.

// export const createPrompt = (data: PatientFormType): string => `
// 	На основе следующих данных о пациенте:

// 	- Возраст: ${data.age}
// 	- Пол: ${data.gender}
// 	- Рост: ${data.height} см
// 	- Вес: ${data.weight} кг
// 	- Артериальное давление: ${data.bloodPressure}
// 	- Дополнительные заметки: ${data.notes}

// 	пожалуйста, предоставьте структурированный развернутый ответ.
// 	Структура ответа должна быть следующей:
// 	с резюме и анализом состояния пациента,
// 	списком рекомендаций пациенту, необходимых для улучшения здоровья, если в ходе анализа были выявлены проблемы,
// 	списком продуктов, рекомендованных к употреблению
// 	и заключение с рекомендациями по изменению образа жизни, диете, физическим упражнениям и любые другие соответствующие советы по здоровью. Учитывайте возраст, пол и любые указанные особенности состояния.

// 	При этом перед резюме необходимо вставить ${PromptParts.RESUME},
// 	перед списком рекомендаций вставить ${PromptParts.RECOMMENDATIONS}б
// 	перед списком продуктов поставить ${PromptParts.GROCERIES},
// 	перед заключением вставить ${PromptParts.SUMMARY}
// 	`;

/**виды форм:
- смарт-диагностика
- базовая анкета
- база симптомов
- база болезней
- дефицыты
- добавить выбор видов форм
*/

/**
 * нужен FieldConstructor для добавления полей на лету
 * компоненты специализированных форм (наборы инпутов, расширяющих шлавную форму)
 */
