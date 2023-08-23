import unittest
from selenium import webdriver 
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
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
        self.driver.maximize_window()
           
        self.username    = self.driver.find_element(By.ID, "formUsername")
        self.email       = self.driver.find_element(By.ID, "formEmail")
        self.first_name  = self.driver.find_element(By.ID, "formFirstName")
        self.last_name   = self.driver.find_element(By.ID, "formLastName")
        self.dob         = self.driver.find_element(By.ID, "formDOB")
        self.phone       = self.driver.find_element(By.ID, "formPhone")
        self.password    = self.driver.find_element(By.ID, "formPassword")
        self.confirm_pw  = self.driver.find_element(By.ID, "formConfirmPassword")

        self.username_help   = self.driver.find_element(By.ID, "usernameHelpBlock")
        self.email_help      = self.driver.find_element(By.ID, "emailHelpBlock")
        self.first_name_help = self.driver.find_element(By.ID, "fnameHelpBlock")
        self.last_name_help  = self.driver.find_element(By.ID, "lnameHelpBlock")
        self.phone_help      = self.driver.find_element(By.ID, "phoneHelpBlock")
        self.password_help   = self.driver.find_element(By.ID, "password1HelpBlock")
        self.confirm_pw_help = self.driver.find_element(By.ID, "password2HelpBlock")
    
    def test_valid_account_form_fields(self):
        self.username.send_keys("dogwoofwoof")
        self.email.send_keys("woofwoof@email.com")
        self.first_name.send_keys("dog")
        self.last_name.send_keys("woof")
        self.phone.send_keys("1234567890")
        self.dob.send_keys("01012021")
        self.password.send_keys("password")
        self.confirm_pw.send_keys("password")

        make_changes_btn = self.driver.find_element(By.ID, "makeChangesBtn")
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)
        make_changes_btn.click()

        self.driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(3)

        help_text = []
        if self.username_help.text != "":
          help_text.append(self.username_help.text)
        if self.email_help.text != "":
          help_text.append(self.email_help.text)
        if self.first_name_help.text != "":
          help_text.append(self.first_name_help.text)
        if self.last_name_help.text != "":
          help_text.append(self.last_name_help.text)
        if self.phone_help.text != "":
          help_text.append(self.phone_help.text)
        if self.password_help.text != "":
          help_text.append(self.password_help.text)
        if self.confirm_pw_help.text != "":        
          help_text.append(self.confirm_pw_help.text)

        self.assertEquals(help_text, [], str(help_text))

    def test_invalid_account_form_fields(self):
        self.username.send_keys("123")
        self.email.send_keys("123")
        self.first_name.send_keys("123")
        self.last_name.send_keys("123")
        self.phone.send_keys("123")
        self.dob.send_keys("01012021")
        self.password.send_keys("2")
        self.confirm_pw.send_keys("4")

        make_changes_btn = self.driver.find_element(By.ID, "makeChangesBtn")
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(3)
        make_changes_btn.click()

        self.driver.execute_script("window.scrollTo(0, 0);")
        time.sleep(3)

        help_text = []
        # if self.username_help.text == "":
        #   help_text.append("Expected usernameHelpBlock to display error, but it was blank instead.")
        if self.email_help.text == "":
          help_text.append("Expected emailHelpBlock to display error, but it was blank instead.")
        if self.first_name_help.text == "":
          help_text.append("Expected fnameHelpBlock to display error, but it was blank instead.")
        if self.last_name_help.text == "":
          help_text.append("Expected lnameHelpBlock to display error, but it was blank instead.")
        if self.phone_help.text == "":
          help_text.append("Expected phoneHelpBlock to display error, but it was blank instead.")
        if self.password_help.text == "":
          help_text.append("Expected password1HelpBlock to display error, but it was blank instead.")
        if self.confirm_pw_help.text == "":        
          help_text.append("Expected password2HelpBlock to display error, but it was blank instead.")

        self.assertEquals(help_text, [], str(help_text))

    def tearDown(self):
        self.driver.close()

if __name__ == '__main__':
    unittest.main()