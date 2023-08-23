import unittest
from selenium import webdriver 
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
import os
import time

class PythonTestUI(unittest.TestCase):
    
    def setUp(self):
        compatible = False
        current_path          = os.path.abspath("")
        self.current_path     = current_path
        path_to_chrome_driver_folder = current_path + "\chromedriver_win32\\"
        webdriver_version = ["chrome_driver_96","chrome_driver_95","chrome_driver_94"]
        for i in webdriver_version:
            path_to_chrome_driver = path_to_chrome_driver_folder + i
            print(path_to_chrome_driver)
            service = Service(path_to_chrome_driver)
            try:
                self.driver = webdriver.Chrome(service = service)
            except WebDriverException:
                pass
            else:
                compatible = True
                break
        if not compatible:
            raise Exception("Chrome web driver is not compatible with your chrome. Please update your chrome.")    
            
    # def test_correct_input(self):
    #     driver       = self.driver
    #     path_to_html = "http://localhost:3000/"
    #     driver.get(path_to_html)
    #     # do you stuff here
    
    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()