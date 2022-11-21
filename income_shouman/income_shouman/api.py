
import io
import os
from base64 import b64encode
import datetime
import time

import frappe
import requests
import json
from pyqrcode import create as qr_create

#income_shouman.income_shouman.api.test   
@frappe.whitelist()
def test(emps):
    documents = json.loads(emps)
    for document in documents:
        doc = frappe.new_doc('Employee_Shouman')
        doc.emp_name = document["emp_name"]
        doc.dob = document["dob"]
        doc.doh = document["doh"]
        doc.nid = document["nid"]
        doc.insert()

    frappe.db.commit()
    return {"payload": emps}

@frappe.whitelist()
def upload_income(list):
    documents = json.loads(list)

    for document in documents:

        emp = frappe.get_doc('Employee_Shouman', {'nid': document["nid"]}, "*", as_dict=True)
        print((emp.emp_name))
        
        if emp != None:
            emp.append('income_details', {
                'date': document["date"],
                'category': document["category"],
                'total': document["total"]
            })

            emp.save()

    frappe.db.commit()
    return {"payload": list}
