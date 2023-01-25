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

		let value = 0;

		// alert("frm.doc.distance " + frm.doc.distance)

		let position = 0;
		let filterdPositionSetting = position_settings.find( x => x.position == emp.position && flt(x.up_to_distance) >= flt(frm.doc.distance) );
		console.log(filterdPositionSetting)
		
		if ( filterdPositionSetting ) {
			position = filterdPositionSetting.value;
		}
		value += position;

		// alert("position " + position)

		let distance = 0;
		if ( frm.doc.distance <= 200 ) distance = distance_settings.less_than_200_km;
		else if ( frm.doc.distance > 300 ) distance = distance_settings.more_than_300_km;
		else distance = distance_settings.from_200_to_300_kms;
		value += distance;

		// alert("distance " + distance)

		let period = 0;
		if ( frm.doc.period == 0  ) period = period_settings.within_time;
		else if ( frm.doc.period <= 12 ) period = period_settings.less_than_12_hours;
		else period = period_settings.more_than_12_hours;
		value += period;

		// alert("period " + period)
	
		frm.set_value('value', value);
		frm.refresh_field('value');
	},

	// employee: (frm, cdt, cdn) => {
	// 	emp = locals[cdt];
	// }
});
