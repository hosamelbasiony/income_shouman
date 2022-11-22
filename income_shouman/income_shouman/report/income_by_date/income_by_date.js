// Copyright (c) 2022, Hosam and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Income By Date"] = {
	"filters": [
		// {
		// 	"fieldname": "Employee_Shouman",
		// 	"fieldtype": "Link",
		// 	"label": "Employee",
		// 	"mandatory": 0,
		// 	"wildcard_filter": 0,
		// 	"options": "Employee_Shouman"
		// },
		{
			"fieldname": "Employee_Shouman",
			"fieldtype": "Link",
			"label": "Employee",
			"mandatory": 0,
			"wildcard_filter": 0,
			"options": "Employee_Shouman"
		},
		{
			"fieldname": "category",
			"fieldtype": "Select",
			"label": "Category",
			"mandatory": 0,
			"wildcard_filter": 1,
			options: [
				{ "value": "", "label": __("All") },
				{ "value": "Award", "label": __("Award") },
				{ "value": "Salary", "label": __("Salary") },
				{ "value": "Overtime", "label": __("Overtime") }
			],
		},
		{
			"fieldname": "date1",
			"fieldtype": "Date",
			"label": "From Date",
			"mandatory": 1,
			"wildcard_filter": 0,
			"default": frappe.datetime.get_today()
		},
		{
			"fieldname": "date2",
			"fieldtype": "Date",
			"label": "To Date",
			"mandatory": 1,
			"wildcard_filter": 0,
			"default": frappe.datetime.get_today()
		},
	]
};
