# about.py
import frappe

def get_context(context):
    context.about_us_settings = frappe.get_doc('About Us Settings')
    return context