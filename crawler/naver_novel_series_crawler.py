import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep
import pandas as pd
import random

from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

#크롬 드라이버 자동 업데이트
from webdriver_manager.chrome import ChromeDriverManager

#브라우저 꺼짐 방지
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

#불필요한 에러 메시지 없애기
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])


URL = 'https://series.naver.com/novel/categoryProductList.series?categoryTypeCode=genre&'
html = requests.get(URL).text # html 문서 전체를 긁어서 출력해줌, .text는 태그 제외하고 text만 출력되게 함
soup = BeautifulSoup(html, 'html.parser')

id_list = [] ; title_list = [] ; author_list = [] ; day_list = [] ; genre_list = [] ; 
story_list = [] ; platform_list = []; img_list=[]; amount_list=[]; score_list=[]; isDoing_list=[]; start_date_list=[]
tag_list = []; viewer_list = []; grade_list = []; num = 0; href_list=[]

genreCode = ['201', '207', '202', '208', '206', '203', '205']
service = Service(executable_path=ChromeDriverManager().install())
driver = webdriver.Chrome(r'C:\ssafy\특화프로젝트\crawling\chromedriver', options = chrome_options)

p = 0;

for i in range(len(genreCode)):
# for i in range(1):

    sleep(0.5) # 크롤링 중간 중간 텀을 주어 과부하 생기지 않도록

    for p in range(1, 31):
        # p = p+1
        # try:

            if p==29 and i==5:
                    break
            
            driver.get(URL+f'genreCode={genreCode[i]}'+'&page='+str(p)) 

            
            for j in range(1, 26):

                if p==28 and i==5 and j==14:
                    break
                page = driver.find_element(By.XPATH,f'//*[@id="content"]/div/ul/li[{j}]')


                sleep(0.5)

                href = page.find_element(By.TAG_NAME,'a').get_attribute('href')
                driver.get(href)

                html = driver.page_source
                soup = BeautifulSoup(html, 'html.parser') # 이동한 페이지 주소 읽고 파싱

                try:
                    title = driver.find_element(By.XPATH,'//*[@id="content"]/div[1]/h2').text.replace("독점","네이버 독점")
                    if '단행본' in title:
                          driver.back()
                          continue

                except:
                    driver.back()
                    continue

                   
                try:
                    driver.find_element(By.XPATH,'//*[@id="content"]/div[2]/div[1]/span/a').click()
                except:
                    story = driver.find_element(By.XPATH,'//*[@id="content"]/div[2]/div').text.replace("접기", "")

                
                try:
                    story = driver.find_element(By.XPATH, '//*[@id="content"]/div[2]/div[2]').text.replace("접기", "")
                except:
                    story = driver.find_element(By.XPATH,'//*[@id="content"]/div[2]/div').text.replace("접기", "")

                story_list.append(story)

                title_list.append(title)
        
                try:
                    img = driver.find_element(By.XPATH,'//*[@id="container"]/div[1]/a/img').get_attribute('src').replace('?type=m260','')
                except:
                    img = driver.find_element(By.XPATH,'//*[@id="container"]/div[1]/span/img').get_attribute('src').replace('?type=m260','')
                        
                print(img)
                img_list.append(img)
               
                
                amount = driver.find_element(By.XPATH,'//*[@id="content"]/h5/strong').text
                amount_list.append(amount);

                    
                id_list.append(num) ; num += 1  # id 리스트에 추가

                platform_list.append('네이버') # 플랫폼 리스트에 추가


                author = driver.find_element(By.XPATH,'//*[@id="content"]/ul[1]/li/ul/li[3]/a').text
                author_list.append(author)

                score = driver.find_element(By.XPATH,'//*[@id="content"]/div[1]/div[1]/em').text
                score_list.append(score)

                isDoing = driver.find_element(By.XPATH,'//*[@id="content"]/ul[1]/li/ul/li[1]/span').text
                isDoing_list.append(isDoing)

                href_list.append(href)

                    
                genre = driver.find_element(By.XPATH,'//*[@id="content"]/ul[1]/li/ul/li[2]/span/a').text
                genre_list.append(genre)

                tag_list.append(genre)  

                viewer_list.append(random.randrange(3, 8))

                sleep(0.5)             

                try:
                    start_date = driver.find_element(By.XPATH, '//*[@id="volumeList"]/tr[1]/td[1]/div/em').text.replace("(","").replace(")","")
                except:
                    start_date = driver.find_element(By.XPATH, '//*[@id="volumeList"]/tr[1]/td[1]/div/a/em').text.replace("(","").replace(")","")
                print(start_date[:-1])
                start_date_list.append(start_date[:-1])
                driver.back() # 뒤로 가기
        # except Exception as e:
        #         driver.back() # 뒤로 가기

        #     p = 0
        #     break

cols = []
total_data = pd.DataFrame(columns = cols)
total_data['id'] = id_list
total_data['title'] = title_list
total_data['img'] = img_list
total_data['author'] = author_list
total_data['day'] = isDoing_list
total_data['genre'] = genre_list
total_data['story'] = story_list
total_data['tag'] = tag_list
total_data['viewer'] = viewer_list
total_data['grade'] = score_list
total_data['regist'] = start_date_list
total_data['series'] = amount_list
total_data['href'] = href_list
total_data['platform'] = platform_list
total_data.to_excel(r'C:\ssafy\특화프로젝트\crawling\naver\네이버웹소설_href추가.xlsx',  sheet_name = '네이버 웹소설', encoding = 'utf-8-sig')

