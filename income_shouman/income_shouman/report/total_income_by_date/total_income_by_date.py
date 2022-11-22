# Copyright (c) 2022, Hosam and contributors
# For license information, please see license.txt

import frappe
from frappe import _, msgprint, scrub
import datetime

def execute(filters=None):
	# columns, data = [], []
	# return columns, data

	# return frappe.db.get_all('Employee_Shouman', ['emp_name', 'doh']) #, ['emp_name', 'doh'], filters = [])

	if not filters: filters = {}
	
	columns, data = [], []

	columns = get_columns()
	cs_data = get_cs_data(filters)

	chart = get_chart_data(cs_data)

	if not cs_data:
		msgprint(_('No records found'))

	data = []
	for d in cs_data:
		row = frappe._dict({
			'emp_name': d.emp_name,
			'dob': d.dob,
			'doh': d.doh
		})
		data.append(row)
	
	# return columns, data, None, chart
	profit = 10
	report_summary = [{"value": "100", "label": _("Total Asset"), "datatype": "Currency", "currency": "EGP"},
		{
			"value": "25698",
			"label": _("Total Liability"),
			"datatype": "Currency",
			"currency": "EGP",
		},
		{"value": "10250", "label": _("Total Equity"), "datatype": "Currency", "currency": "EGP"},
		{
			"value": "25698",
			"label": _("Provisional Profit / Loss (Credit)"),
			"indicator": "Green" if 25698 > 0 else "Red",
			"datatype": "Currency",
			"currency": "EGP",
		},]

	return columns, data, None, chart, report_summary

def get_columns():
	return [
		{
			"fieldname": "emp_name",
			"fieldtype": "Data",
			"label": _("Emp Name"),
			"width": 250
		},
		{
			"fieldname": "dob",
			"fieldtype": "Date",
			"label": _("DOB"),
			"width": 150
		},
		{
			"fieldname": "doh",
			"fieldtype": "Date",
			"label": _("DOH"),
			"width": 150
		},
		{
			"fieldname": "governorate",
			"fieldtype": "Data",
			"label": _("Governorate"),
			"width": 150
		},
		{
			"fieldname": "province",
			"fieldtype": "Data",
			"label": _("Province"),
			"width": 150
		},
		{
			"fieldname": "phone",
			"fieldtype": "Data",
			"label": _("Phone"),
			"width": 150
		}
	]


def get_cs_data(filters):
	conditions = get_conditions(filters)

	data = frappe.get_all(
		doctype="Employee_Shouman",
		# fields=["emp_name", "dob", "doh", "governorate", "province"],
		fields=["*"],
		filters=conditions,
		order_by="emp_name",
		start=0,
		page_length=50,
		# as_list=1,
	)

	# print(data)
	return data

def get_conditions(filters):
	conditions = {}
	for key, value in filters.items():
		if filters.get(key):
			conditions[key] = value

	return conditions


def get_chart_data(data):
	if not data: return None
	
	labels = ["DOB > 1980", "DOB 1980 - 1990", "DOB 1990 - 1995", "DOB <= 1995"]

	age_data = {
		"DOB > 1980": 25,
		"DOB 1980 - 1990": 100,
		"DOB 1990 - 1995": 55,
		"DOB <= 1995": 0,
	}

	datasets = []

	for entry in data:
		if entry.dob != None:
			print(entry.dob)
			
			if entry.dob > datetime.datetime.strptime("1980-01-01", "%Y-%m-%d").date():
				age_data["DOB > 1980"] += 1
			else:
				age_data["DOB <= 1995"] += 1
		
	datasets.append({
		'name': 'Age Status',
		'values': [age_data.get("DOB > 1980"), age_data.get("DOB 1980 - 1990"), age_data.get("DOB 1990 - 1995"),  age_data.get("DOB <= 1995")]
	})

	chart = {
		'data': {
			'labels': labels,
			'datasets': datasets
		},
		'type': 'bar',
		# 'type': 'pie',
		'height': 300,
	}

	return chart