frappe.pages['upload_errands'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Errands',
		single_column: true
	});

	page.set_secondary_action('Refresh', () => {

		$(frappe.render_template("upload_errands", {
			title: "Hello Mr Hosam",
			message: "How can i help you ?",
		})).appendTo(page.body);

	});

	
	page.add_action_item('<i class="fa fa-cloud-download" style="color: grey;margin-right:.5rem;"></i>Upload List', () => {

	});

	let statusField = page.add_field({
		label: 'Status',
		fieldtype: 'Select',
		fieldname: 'status',
		options: [
			'Open',
			'Closed',
			'Cancelled'
		],
		change() {
			// console.log(statusField.get_value());
		}
	});

	let customerField = page.add_field({
		label: 'Customer',
		fieldtype: 'Link',
		fieldname: 'customer',
		options: 'Customer',
		change() {
			// console.log(statusField.get_value());
		}
	});

	let fromDateField = page.add_field({
		label: 'From Posting Date',
		fieldtype: 'Date',
		fieldname: 'from_date',
		default: frappe.datetime.get_today(),
		change() {
			// console.log(fromDateField.get_value());
		}
	});

	let toDateField = page.add_field({
		label: 'To Posting Date',
		fieldtype: 'Date',
		fieldname: 'to_date',
		default: frappe.datetime.get_today(),
		change() {
			// console.log(toDateField.get_value());
		}
	});
}