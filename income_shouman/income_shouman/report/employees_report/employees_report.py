# Copyright (c) 2022, Hosam and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe import _, msgprint, scrub
import datetime
from frappe.utils import add_days, format_date, getdate
import random

def execute(filters=None):
	
	conditions = []

	if filters.name:
		conditions.append({
			'name': ['=', filters.name]
		})

	# if filters.emp_name:
	# 	conditions.append({
	# 		'emp_name': ['LIKE', filters.name]
	# 	})

	print(conditions)
	
	results = frappe.db.get_all(
		'Employee_Shouman', 
		['*'], 
		filters=conditions,
		start=0,
		# page_length=100,
	)

	# Then, for fun, let's define a new property programmatically
	for result in results:
		result.backwards_name = result.emp_name # [::-1]

		result.income = []
		
		if filters.date_from and filters.date_to:
			income = frappe.db.get_all(
				'Income Category', 
				['*'], 
				filters=[
					{ 'parent': ['=', result.name] },
					{ 'date': ['>=', filters.date_from] },
					{ 'date': ['<=', filters.date_to] },
				],
				start=0,
				page_length=100,
				# as_list=True
			)

			result.income = income
			result.total = sum(c.total for c in income)
		else:
			result.income = []

	## Next, we can add a custom message. This will appear near the top
	message = "This report has been generated automatically."

	## After that, we can generate a report summary to display above the chart and the data
	## (For this, we'll split our list up a bit using comprehensions. You can generate this summary data any way you want.)
	male_users = results
	female_users = results
	# male_users = [user for user in results if user.gender == "Male"]
	# female_users = [user for user in results if user.gender == "Female"]

	# for row in results:
	# 	row.total = random.randrange(100, 10000, 3)

	females = 0
	try:
		females = (100 * len(female_users) / len(results))
	except ZeroDivisionError:
		z = 0

	report_summary = [
		{
			"value": format_date(frappe.utils.nowdate()),
			"label": "Report Date",
			"datatype": "Data",
		},
		{
			"value": len(results),
			"label": "Total employees",
			"datatype": "Data",
		},
		{
			"value": females,
			"label": "Percent total",
			"indicator": "Red" if females > 50 else "Blue",
			"datatype": "Percent",
		}
	]

	## Now, we can generate a chart using standard Frappe Charts syntax
	## To keep things short, I'm just manually entering data here, but of course usually this would be generated programmatically
	
	chart = {
		'data': {
			'labels': ["One", "Two", "Three", "One"],
			'datasets': [
				{
					'name': "High income", 'type': "bar",
					'values': [3, 5, 7, 3]
				},
				{
					'name': "Fair income", 'type': "bar",
					'values': [4, 2, 2, 4]
				},
				{
					'name': "Low income", 'type': "bar",
					'values': [4, 7, 4, 5]
				}
			]
		},
		'type': "bar"
	}

	## Finally, define your columns. Many of the usual field definition properties are available here for use.
	## If you wanted to, you could also specify these columns in the child table above.
	columns = [
		{
			'fieldname': 'name',
			'label': _('Document Link'),
			'fieldtype': 'Link',
			'options': 'Employee_Shouman',
			'align': 'center',
			'width': 300
		},
		{
			'fieldname': 'nid',
			'label': _('National Id'),
			'fieldtype': 'Data',
			'align': 'left',
			'width': 200
		},
		{
			'fieldname': 'dob',
			'label': _('DOB'),
			'fieldtype': 'Date',
			'width': 150,
			'align': 'left'
		},
		{
			'fieldname': 'doh',
			'label': _('DOH'),
			'fieldtype': 'Date',
			'width': 150,
			'align': 'left'
		},
		{
			# here's our `backwards_name` field, which we defined earlier
			'fieldname': 'backwards_name',
			'label': _('Backwards Name'),
			'fieldtype': 'Data',
			'align': 'right',
			'width': 200
		},
		{
			'fieldname': 'total',
			'label': _('Total'),
			'fieldtype': 'Data',
			'align': 'center',
			'width': 150
		},
	]

	## finally, we assemble it all together
	return columns, results, message, chart, report_summary
