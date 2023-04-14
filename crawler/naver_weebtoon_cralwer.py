import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep
import pandas as pd
from selenium.webdriver.common.keys import Keys
import pyautogui
import pyperclip
import time
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# 크롬 드라이버 자동 업데이트
from webdriver_manager.chrome import ChromeDriverManager

# 브라우저 꺼짐 방지
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

# 불필요한 에러 메시지 없애기
chrome_options.add_experimental_option("excludeSwitches", ["enable-logging"])

URL = 'https://comic.naver.com/webtoon'
html = requests.get(URL).text  # html 문서 전체를 긁어서 출력해줌, .text는 태그 제외하고 text만 출력되게 함
soup = BeautifulSoup(html, 'html.parser')

week = ['tab=mon', 'tab=tue', 'tab=tue', 'tab=wed', 'tab=fri', 'tab=sat', 'tab=sun', 'tab=finish']
ko_week = ['월', '화', '수', '목', '금', '토', '일', '완결']

id_list = [];
title_list = [];
author_list = [];
day_list = [];
genre_list = [];
story_list = [];
platform_list = [];
img_list = [];
tag_list = [];
grade_list = [];
viewer_list = [];
series_list = [];
regist_list = [];
href_list1 = []
num = 1

driver = webdriver.Chrome(r'C:\ssafy\특화프로젝트\crawling\chromedriver', options=chrome_options)


def naver_login():
    login = 'https://nid.naver.com/nidlogin.login?url=https%3A%2F%2Fcomic.naver.com%2Fwebtoon%3Ftab%3Dmon'
    driver.implicitly_wait(2)
    driver.maximize_window()
    driver.get(login)

    driver.find_element_by_xpath('//*[@id="id"]').click()
    pyperclip.copy('{아이디}')
    pyautogui.hotkey('ctrl', 'v')
    sleep(5)

    driver.find_element_by_xpath('//*[@id="pw"]').click()
    pyperclip.copy('{비밀번호}')
    pyautogui.hotkey('ctrl', 'v')
    sleep(5)

    # 로그인 버튼
    login_send = driver.find_element_by_xpath('//*[@id="log.login"]')
    login_send.click()


driver.get(URL)
driver.implicitly_wait(3)  # 로딩이 끝날 때까지 10초까지는 기다려줌
naver_login()  # 로그인

for i in range(7, 8):
    sleep(0.5)
    uri = URL + "?" + week[i]

    driver.get(uri)  # 요일별로 링크 가져옴

    sleep(0.5)

    # 스크롤 전 높이
    before_h = driver.execute_script("return window.scrollY")

    # 무한 스크롤
    while True:

        sleep(3)

        # 맨 아래로 스크롤을 내린다
        driver.find_element_by_css_selector("body").send_keys(Keys.END)

        # 스크롤 사이 페이지 로딩 시간
        sleep(3)

        # 스크롤 후 높이
        after_h = driver.execute_script("return window.scrollY")

        if after_h == before_h:
            break

        sleep(3)

        before_h = after_h

    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')  # 이동한 페이지 주소 읽고 파싱

    sleep(1)

    href_list = driver.find_elements_by_xpath('//*[@id="content"]/div[1]/ul/li/a')
    grades = driver.find_elements_by_xpath('//*[@id="content"]/div[1]/ul/li/div/div/span')
    authors_list = soup.find_all('a', {'class': 'ContentAuthor__author--CTAAP'})

    page_list = []
    for page in href_list:
        page_list.append(page.get_attribute('href'))

    scores = []
    for grade in grades:
        scores.append(grade.text.replace("별점", "").replace("\n", ""))

    authors = []
    for a in authors_list:
        authors.append(a.text)
        print(a.text)

    idx = 0

    print(len(page_list))

    for href in page_list:

        sleep(0.5)

        href_list1.append(href)

        sleep(0.5)

        driver.get(href + "&page=1&sort=ASC")  # 디테일 이동

        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')  # 이동한 페이지 주소 읽고 파싱

        sleep(2)

        day = ko_week[i]

        try:
            title = driver.find_element_by_xpath('//*[@id="content"]/div[1]/div/h2').text.replace('휴재', '')
            if (title in title_list):  # 요일 두 개 이상이면 요일만 추가함
                day_list[title_list.index(title)] += ' ' + day
                driver.back()
                continue
        except:
            driver.back()

        title_list.append(title)

        grade_list.append(scores[idx])

        author_list.append(authors[idx])

        id_list.append(num);
        num += 1  # id 리스트에 추가

        sleep(0.2)

        first = driver.find_element_by_xpath('//*[@id="content"]/div[3]/ul/li[1]/a/div[2]/div/span[2]').text
        regist_list.append("20" + first)

        sleep(2)

        ## 이미지
        thumb = driver.find_element_by_xpath('//*[@id="content"]/div[1]/button/div/img').get_attribute('src')

    img_list.append(thumb)

    ## 요일
    day_list.append(day)

    ## 줄거리
    story = driver.find_element_by_xpath('//*[@id="content"]/div[1]/div/div[2]/p').text
    story_list.append(story)

    ## 장르 & 태그
    tags = driver.find_elements_by_xpath('//*[@id="content"]/div[1]/div/div[2]/div/div/a')
    temp = ""
    genre = tags[0].text.replace("#", "")
    genre_list.append(genre)

    for tag in tags:
        temp += tag.text.replace("#", "") + " "
    tag_list.append(temp)

    viewer = driver.find_element_by_xpath('//*[@id="content"]/div[2]/div/button[1]/span[2]').text
    viewer_list.append(viewer)

    try:
        series = driver.find_element_by_xpath('//*[@id="content"]/div[3]/div[1]/div[1]').text
    except:
        series = driver.find_element_by_xpath('//*[@id="content"]/div[3]/div[2]/div[1]').text
    series = series.replace("총 ", "")
    series = series.replace("화", "")
    series_list.append(series)

    platform_list.append("네이버")

    driver.back()

    idx += 1

total_data = pd.DataFrame()
total_data['id'] = id_list
total_data['title'] = title_list
total_data['img'] = img_list  ## 썸네일
total_data['author'] = author_list
total_data['day'] = day_list
total_data['genre'] = genre_list
total_data['story'] = story_list
total_data['tag'] = tag_list
total_data['viewer'] = viewer_list
total_data['grade'] = grade_list
total_data['regist'] = regist_list
total_data['series'] = series_list
total_data['href'] = href_list1
total_data['platform'] = platform_list
total_data.to_excel(r'C:\ssafy\특화프로젝트\crawling\naver\네이버웹툰_완결_1760_new.xlsx', sheet_name='네이버 웹툰', encoding='utf-8-sig')
