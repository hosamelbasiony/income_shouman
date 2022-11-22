# Copyright (c) 2022, Hosam and contributors
# For license information, please see license.txt

import frappe
from frappe import _, msgprint, scrub
import datetime


def execute(filters=None):
	print(filters.date1)
	# columns, data = [], []
	# return columns, data

	# columns = ["parent", "category", "date", "total"]
	columns = [
		{
			"fieldname": "doh",
			"fieldtype": "Data",
			"label": _("DOH"),
			"width": 150
		},
		{
			"fieldname": "nid",
			"fieldtype": "Data",
			"label": _("National ID"),
			"width": 200
		},
		{
			"fieldname": "emp_name",
			"fieldtype": "Data",
			"label": _("Employee Name"),
			"width": 250
		},
		{
			"fieldname": "category",
			"fieldtype": "Data",
			"label": _("Category"),
			"width": 250
		},
		{
			"fieldname": "date",
			"fieldtype": "Date",
			"label": _("Date"),
			"width": 150
		},
		{
			"fieldname": "total",
			"fieldtype": "Currency",
			"label": _("Total"),
			"width": 150
		},
	]

	conditions = [{ 'date': ['>=', filters.date1] }, { 'date': ['<=', filters.date2] }]

	if filters.category:
		conditions.append({
			'category': ['LIKE', filters.category]
		})

	print(conditions)

	data = frappe.get_all(
		doctype="Income Category",
		fields=["parent", "category", "date", "total"],
		filters=conditions,
		order_by="date",
		# start=0,
		# page_length=20,
		# as_list=True
	)

	for income in data:
		doc = frappe.get_doc("Employee_Shouman", income["parent"])
		# print(_(doc.emp_name))
		income.emp_name =doc.emp_name
		income.nid =doc.nid
		income.doh =doc.doh

	return columns, data

