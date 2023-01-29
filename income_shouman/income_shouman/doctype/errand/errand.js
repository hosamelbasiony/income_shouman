// Copyright (c) 2023, Hosam and contributors
// For license information, please see license.txt

let emp = null;
let distance_settings = null;
let period_settings = null;
let position_settings = null;


frappe.ui.form.on('Errand', {

	setup: async frm => {
        
    },

	refresh: async frm => {
		
	},

	validate: async (frm, cdt, cdn) => {
		if ( emp == null ) {
			let url = `../resource/Employee_Shouman/${frm.doc.employee}`;		
			let ret = await frappe.call({
				method: url,
				type: "GET",
				Headers: {"Content-Type":"application/json"},
				freeze: false,
				// freeze_message: __("Loading invoices list ..."),
				
			});

			emp = ret.data;
		}

		if ( position_settings == null ) {
			let url = `income_shouman.income_shouman.api.get_settings`;
			let ret = await frappe.call({
				method: url,
				type: "GET",
				Headers: {"Content-Type":"application/json"}
			});

			distance_settings = ret.message.distance_settings;
			period_settings = ret.message.period_settings;
			position_settings = ret.message.position_settings;
			position_settings = position_settings.sort((a, b) => (a.up_to_distance > b.up_to_distance) ? 1 : -1 );

			console.log(position_settings)
		}

		let value = flt(frm.doc.transportation_allowance);
		value += flt(frm.doc.nights) * 25

		let position = 0;
		let filterdPositionSetting = position_settings.find( x => x.position == emp.position && flt(x.up_to_distance) >= flt(frm.doc.distance) );
		console.log(filterdPositionSetting)
		// alert(JSON.stringify(position_settings, undefined, 3));
		
		if ( filterdPositionSetting ) {
			position = filterdPositionSetting.value;
		}

		let date_1 = new Date(frm.doc.from_date);
		let date_2 = new Date(frm.doc.to_date);

		let difference = date_1.getTime() - date_2.getTime();
		console.log(difference);

		let totalDays = 1 + Math.abs(Math.ceil(difference / (1000 * 3600 * 24)));
		console.log(totalDays + ' days period')
		

		if ( flt(frm.doc.distance) <= 50 ) {
			let addedHourValue = flt(emp.basic_salary ) * 2.25 / 240 * 1.35;
			value += addedHourValue * flt(frm.doc.overtime_hours )
		} else if ( flt(frm.doc.official_vacation_days) > 0) {
			// totalDays
			value += position * flt(frm.doc.official_vacation_days) * 1.5;
			value += position * ( totalDays - flt(frm.doc.official_vacation_days) )
		} else {
			value += position * totalDays;
		}

		// let position = 0;
		// let filterdPositionSetting = position_settings.find( x => x.position == emp.position && flt(x.up_to_distance) >= flt(frm.doc.distance) );
		// console.log(filterdPositionSetting)
		
		// if ( filterdPositionSetting ) {
		// 	position = filterdPositionSetting.value;
		// }
		// value += position;

		// let distance = 0;
		// if ( frm.doc.distance <= 200 ) distance = distance_settings.less_than_200_km;
		// else if ( frm.doc.distance > 300 ) distance = distance_settings.more_than_300_km;
		// else distance = distance_settings.from_200_to_300_kms;
		// value += distance;

		// let period = 0;
		// if ( frm.doc.period == "More Than 12 Hours" ) period = period_settings.more_than_12_hours;
		// else if ( frm.doc.period == "Less Than 12 Hours" ) period = period_settings.less_than_12_hours;
		// else period = period_settings.within_time;
		// value += period;
	
		frm.set_value('value', value);
		frm.refresh_field('value');
	},

	// employee: (frm, cdt, cdn) => {
	// 	emp = locals[cdt];
	// }
});
