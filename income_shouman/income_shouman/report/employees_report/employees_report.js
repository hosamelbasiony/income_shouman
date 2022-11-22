// Copyright (c) 2022, Hosam and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Employees Report"] = {
	"filters": [
		{
			"fieldname": "name",
			"fieldtype": "Link",
			"label": "Employee",
			"mandatory": 0,
			"options": "Employee_Shouman"
		},
		// {
		// 	"fieldname": "emp_name",
		// 	"fieldtype": "Data",
		// 	"label": "Employee Name",
		// 	"mandatory": 0,
		// 	"wildcard_filter": 1
		// },
		{
			"fieldname": "date_from",
			"fieldtype": "Date",
			"label": "From Date",
			"mandatory": 0,
			"wildcard_filter": 0
		},
		{
			"fieldname": "date_to",
			"fieldtype": "Date",
			"label": "To Date",
			"mandatory": 0,
			"wildcard_filter": 0
		},
		// {
		// 	"fieldname": "doh",
		// 	"fieldtype": "Date",
		// 	"label": "DOH",
		// 	"mandatory": 0,
		// 	"wildcard_filter": 0
		// },
		// {
		// 	"fieldname": "governorate",
		// 	"fieldtype": "Data",
		// 	"label": "Governorate",
		// 	"wildcard_filter": 1
		// 	// "options": "Income Detail",
		// }
	]
};