import unittest
from selenium import webdriver 
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import pathlib
import os
import time

class PythonTestUI(unittest.TestCase):
    def setUp(self):
        compatible = False
        current_path          = str(pathlib.Path(__file__).parent.parent.resolve())
        print(current_path)
        self.current_path     = current_path
        path_to_chrome_driver_folder = current_path + "\chromedriver_win32\\"
        webdriver_version = ["chrome_driver_96","chrome_driver_95","chrome_driver_94"]
        chrome_options = Options()
        # chrome_options.add_experimental_option("detach", True)
        chrome_options.add_argument('headless')
        chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
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

        # Go to 'Settings' page and find web elements
        path_to_html = "http://localhost:3000/"
        self.driver.maximize_window()
        self.driver.get(path_to_html + "Settings")
                
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
           
        self.add_line_1   = self.driver.find_element(By.ID, "formAddLine1")
        self.add_line_2   = self.driver.find_element(By.ID, "formAddLine2")
        self.state        = self.driver.find_element(By.ID, "formState")
        self.city         = self.driver.find_element(By.ID, "formCity")
        self.zip_code     = self.driver.find_element(By.ID, "formZipCode")

        self.add_line_1_help  = self.driver.find_element(By.ID, "addLine1HelpBlock")
        self.add_line_2_help  = self.driver.find_element(By.ID, "addLine2HelpBlock")
        self.state_help       = self.driver.find_element(By.ID, "stateHelpBlock")
        self.city_help        = self.driver.find_element(By.ID, "cityHelpBlock")
        self.zip_code_help    = self.driver.find_element(By.ID, "zipCodeHelpBlock")

        self.make_changes_btn = self.driver.find_element(By.ID, "makeChangesBtn")
    
    def test_valid_address_form_fields(self):
        self.add_line_1.send_keys("123 Sesame Street")
        self.add_line_2.send_keys("Suite 4")
        self.state.send_keys("IA")
        self.city.send_keys("Des Moines")
        self.zip_code.send_keys("12345")
        
        self.make_changes_btn.click()

        try:
          WebDriverWait(self.driver, 10).until(EC.alert_is_present())
          self.driver.switch_to.alert.accept()     
        except:
          pass

        help_text = []
        if self.add_line_1_help.text != "":
          help_text.append(self.add_line_1_help.text)
        if self.add_line_2_help.text != "":
          help_text.append(self.add_line_2_help.text)
        if self.state_help.text != "":
          help_text.append(self.state_help.text)
        if self.city_help.text != "":
          help_text.append(self.city_help.text)
        if self.zip_code_help.text != "":
          help_text.append(self.zip_code_help.text)
        
        self.assertEqual(help_text, [], str(help_text))

    def test_invalid_address_form_fields(self):        
        self.add_line_1.send_keys("___")
        self.add_line_2.send_keys("__")
        self.state.send_keys("Iowa")
        self.city.send_keys("____")
        self.zip_code.send_keys("123456789")
        
        self.make_changes_btn.click()

        try:
          WebDriverWait(self.driver, 10).until(EC.alert_is_present())
          self.driver.switch_to.alert.accept()     
        except:
          pass

        help_text = []
        if self.add_line_1_help.text == "":
          help_text.append("Expected addLine1HelpBlock to display error, but it was blank instead.")
        if self.add_line_2_help.text == "":
          help_text.append("Expected addLine2HelpBlock to display error, but it was blank instead.")
        if self.state_help.text == "":
          help_text.append("Expected stateHelpBlock to display error, but it was blank instead.")
        if self.city_help.text == "":
          help_text.append("Expected cityHelpBlock to display error, but it was blank instead.")
        if self.zip_code_help.text == "":
          help_text.append("Expected zipCodeHelpBlock to display error, but it was blank instead.")
        
        self.assertEqual(help_text, [], str(help_text))

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()