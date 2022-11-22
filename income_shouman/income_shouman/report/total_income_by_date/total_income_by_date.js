// Copyright (c) 2022, Hosam and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Total Income By Date"] = {
	"filters": [
		{
			"fieldname": "emp_name",
			"fieldtype": "Data",
			"label": "Employee Name",
			"mandatory": 0,
			"wildcard_filter": 0
		},
		{
			"fieldname": "dob",
			"fieldtype": "Date",
			"label": "DOB",
			"mandatory": 0,
			"wildcard_filter": 0
		},
		{
			"fieldname": "doh",
			"fieldtype": "Date",
			"label": "DOH",
			"mandatory": 0,
			"wildcard_filter": 0
		},
		{
			"fieldname": "governorate",
			"fieldtype": "Data",
			"label": "Governorate",
			// "options": "Income Detail",
		}
	]
};
