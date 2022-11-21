// Copyright (c) 2022, hossam and contributors
// For license information, please see license.txt

frappe.ui.form.on('Employee_Shouman', {
	refresh: function(frm) {

		let total = 0;

		let incomes = frm.doc.income_details.forEach( item => {
			total += item.total;
		});

		frm.doc.total_income = total;
	
		frm.refresh_field("total_income");
    
   	 	frm.add_custom_button(`
			<span><i class='fa fa-bars' style='font-size:1rem;font-weight: bolds;margin-right:0.5rem; color: reds;'></i>Upload emp list</span>`, () => {


				const newFile = document.createElement("input");
				newFile.setAttribute("type", "file")
				newFile.setAttribute("id", "file1")
				document.body.appendChild(newFile)

				newFile.addEventListener("change", () => {
					let file = document.querySelector(`#file1`);
					let fileToUpload = file.files[0];
			  
					let reader = new FileReader();
					reader.onloadend = e => {
					 	 let arraybuffer = e.target.result;
			  
					 	 var data = new Uint8Array(arraybuffer);
						var arr = new Array();
						for (var i = 0; i !== data.length; ++i)
							arr[i] = String.fromCharCode(data[i]);
						var bstr = arr.join("");
						var workbook = XLSX.read(bstr, { type: "binary", cellDates: true});
						var first_sheet_name = workbook.SheetNames[0];
						var worksheet = workbook.Sheets[first_sheet_name];
						let objs = XLSX.utils.sheet_to_json(worksheet, { raw: true });

						objs = objs.map( x => ({
							...x,
							nid: x?.nid?.toString(),
							dob: new Date(x.dob).toISOString().split('T')[0],
							doh:  new Date(x.doh).toISOString().split('T')[0]
						}))

						
						console.log(objs);

						document.body.removeChild(newFile)
			  
						let url = `income_shouman.income_shouman.api.test`;
						frappe.call({
							method: url,
							type: "POST",
							freeze: true,
							freeze_message:  __(""),
							Headers: {"Content-Type":"application/json"},
							args: {
								"emps": objs
							},
							callback: function(ret) {	
								frappe.msgprint({
									title: __("Successful upload"),
									indicator: "green",
									message: __("Just uploaded the employee list")
								});
							}
						});
			  
					};
			  
					reader.readAsArrayBuffer(fileToUpload);
			  
					file.value = "";
				});

				newFile.click();

			
        }, "Employee options");
    
   	 	frm.add_custom_button(`
			<span><i class='fa fa-bars' style='font-size:1rem;font-weight: bolds;margin-right:0.5rem; color: reds;'></i>Upload income</span>`, () => {


				const newFile = document.createElement("input");
				newFile.setAttribute("type", "file")
				newFile.setAttribute("id", "file1")
				document.body.appendChild(newFile)

				newFile.addEventListener("change", () => {
					let file = document.querySelector(`#file1`);
					let fileToUpload = file.files[0];
			  
					let reader = new FileReader();
					reader.onloadend = e => {
					 	 let arraybuffer = e.target.result;
			  
					 	 var data = new Uint8Array(arraybuffer);
						var arr = new Array();
						for (var i = 0; i !== data.length; ++i)
							arr[i] = String.fromCharCode(data[i]);
						var bstr = arr.join("");
						var workbook = XLSX.read(bstr, { type: "binary", cellDates: true});
						var first_sheet_name = workbook.SheetNames[0];
						var worksheet = workbook.Sheets[first_sheet_name];
						let objs = XLSX.utils.sheet_to_json(worksheet, { raw: true });

						objs = objs.map( x => ({
							...x,
							parent: frm.doc.name,
							nid: x.nid? x.nid.toString():"",
							date:  new Date(x.dd).toISOString().split('T')[0]
						}))

						
						console.log(objs);

						document.body.removeChild(newFile)
			  
						let url = `income_shouman.income_shouman.api.upload_income`;
						frappe.call({
							method: url,
							type: "POST",
							freeze: true,
							freeze_message:  __(""),
							Headers: {"Content-Type":"application/json"},
							args: {
								"list": objs,
								"parent": frm.doc.name
							},
							callback: function(ret) {	
								frappe.msgprint({
									title: __("Successful upload"),
									indicator: "green",
									message: __("Just uploaded the income list")
								});

								frm.reload_doc();
							}
						});
			  
					};
			  
					reader.readAsArrayBuffer(fileToUpload);
			  
					file.value = "";
				});

				newFile.click();

			
        }, "Employee options");
	},
});