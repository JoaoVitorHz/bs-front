//https://www.npmjs.com/package/tailwind-datepicker-react

import { useEffect, useState } from "react"
import Datepicker from "tailwind-datepicker-react"

import { FaCalendarAlt } from "react-icons/fa";

const options = {
	title: "",
	autoHide: true,
	todayBtn: false,
	clearBtn: false,
	clearBtnText: "Clear",
	maxDate: new Date("2030-01-01"),
	minDate: new Date("1950-01-01"),
	theme: {
		background: "border",
		todayBtn: "",
		clearBtn: "",
		icons: "",
		text: "",
		disabledText: "text-gray-300",
		input: "",
		inputIcon: "bg-red-500",
		selected: "bg-black",
	},
	// icons: {
	// 	// () => ReactElement | JSX.Element
	// 	prev: () => <span>Previous</span>,
	// 	next: () => <span>Next</span>,
	// },
	datepickerClassNames: "top-12",
	defaultDate: new Date(),
	language: "pt-br",
	disabledDates: [],
	weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom", ],
	inputNameProp: "date",
	inputIdProp: "date",
	inputPlaceholderProp: "Selecione uma data",
	inputDateFormatProp: {
		day: "numeric",
		month: "long",
		year: "numeric"
	}
}

export const DemoComponent = (props) => {
	const [show, setShow] = useState(false)
	const [selectedDate, setSelectedDate] = useState()
	const [showDate, setShowDate] = useState()
    const [error, setError] = useState(false)

    function handleChange(selectedDate){
        setSelectedDate(FormateDateToSave(selectedDate))
        setShowDate(FormateDateInput(selectedDate))
		
		const currentDate = new Date();
        // const dateSelected = (selectedDate != undefined) ? new Date(selectedDate) : currentDate;
        const dateSelected = selectedDate;
        const isoDateSelected = FormateDateToSave(selectedDate);

        if (dateSelected <= currentDate || props.selectAfterCurrentDay) {
            setError(false);
            // setDate(dateSelected);
            props.onChangeDate(isoDateSelected);
        } else {
            setError(true);
            // setDate(dateSelected);
            props.onChangeDate('');
        }

    }
    function handleClose(state){
		setShow(state)
    }
	function FormateDateToSave(DateString){
		const dateObject = new Date(DateString);
		return dateObject.toISOString();
	}
	function FormateDateInput(DateString){
		const dateObject = new Date(DateString);

		const day = String(dateObject.getDate()).padStart(2, '0');
		const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Os meses são indexados de 0 a 11
		const year = dateObject.getFullYear();

		return `${day}/${month}/${year}`;
	}

	useEffect(() => {
		if(props.defaultText){
			setSelectedDate(FormateDateToSave(props.defaultText))
			setShowDate(FormateDateInput(props.defaultText))
		}
	}, [])

	return (
		<div>
			<Datepicker 
				options={options} 
				onChange={handleChange}
				show={show} 
				setShow={handleClose}
			>
				<div className="flex items-center gap-3  border rounded-sm w-[200px] h-[30px] text-sm px-2">
					<div className="">
						<FaCalendarAlt  />
					</div>
					<input 
						type="text" 
						className="" 
						placeholder="Selecione uma data" 
						value={showDate} 
						onFocus={() => setShow(true)} 
					/>
				</div>
			</Datepicker>
			{error && <span className="text-xs text-red-600">A data de aniversário não pode ser maior do que a data atual.</span>}
		</div>
	)
}