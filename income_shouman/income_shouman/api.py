
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
def get_settings():
    distance_settings = frappe.get_doc("Errand Distance Settings")
    period_settings = frappe.get_doc("Errand Period Settings")
    position_settings = frappe.get_all(
        "Errand Position Settings",
        fields=["*"]
    )
    return {
        "distance_settings": distance_settings,
        "period_settings": period_settings,
        "position_settings": position_settings,
    }

@frappe.whitelist()
def test(emps):
    documents = json.loads(emps)
    # return emps
    for document in documents:
        print(document["emp_name"])
        doc = frappe.new_doc('Employee_Shouman')
        doc.emp_name = document["emp_name"]
        doc.dob = document["dob"]
        doc.doh = document["doh"]
        doc.nid = document["nid"]
        doc.position = document["position"]
        doc.sector = document["sector"]
        doc.basic_salary = document["basic_salary"]
        doc.insert()

    frappe.db.commit()
    return {"payload": emps}

@frappe.whitelist()
def upload_income(list):
    documents = json.loads(list)

    not_found = []

    for document in documents:

        try:
            emp = frappe.get_doc('Employee_Shouman', {'nid': document["nid"]}, "*", as_dict=True)
            
            if emp != None:
                print((emp.emp_name))
                emp.append('income_details', {
                    'date': document["date"],
                    'category': document["category"],
                    'total': document["total"]
                })

                emp.save()
        except:
            not_found.append(document["nid"])
            pass

    #frappe.db.commit()
    return {"not_found": not_found}
