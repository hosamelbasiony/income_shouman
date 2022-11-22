# index.py
import frappe

def get_context(context):
    context.home_page_settings = {
        "show_contact_us": True
    }
    return context