from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in income_shouman/__init__.py
from income_shouman import __version__ as version

setup(
	name="income_shouman",
	version=version,
	description="Income Houman",
	author="Hosam",
	author_email="hosam",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
