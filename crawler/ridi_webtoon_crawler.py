import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep
import pandas as pd
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

id_list = [] ; title_list = [] ; author_list = [] ; day_list = [] ; genre_list = [] ; 
story_list = [] ; platform_list = [] ; img_list = [] ; tag_list = [] ; 
grade_list = [] ; viewer_list = [] ; series_list = [] ; regist_list = [] ; href_list = []

num = 0
driver = webdriver.Chrome('C:/chromedriver.exe') # 크롬 사용하니까

#스크롤 전 높이
before_h = driver.execute_script("return window.scrollY")

for idx in range(1,38):
    
    URL = 'https://ridibooks.com/category/books/1600?adult_exclude=y&page=' + str(idx)
    # html = requests.get(URL).text # html 문서 전체를 긁어서 출력해줌, .text는 태그 제외하고 text만 출력되게 함
    # soup = BeautifulSoup(html, 'html.parser')
    driver.get(URL)
    #무한 스크롤
    while True:
        #맨 아래로 스크롤을 내린다
        sleep(0.1)
        driver.find_element(By.CSS_SELECTOR, "body").send_keys(Keys.PAGE_DOWN)

        #스크롤 사이 페이지 로딩 시간
        sleep(0.1)

        #스크롤 후 높이
        after_h = driver.execute_script("return window.scrollY")

        if after_h == before_h:
            break

        before_h = after_h
    
    sleep(2) 

    pages = driver.find_elements(By.CSS_SELECTOR, '#__next > main > div > section > ul.fig-1nfc3co > li > div > div.fig-9dbn7p > a')
    

    sleep(2)
    page_list = []
    
    for page in pages:
        temp = page.get_attribute('href')
        page_list.append(temp)

    print(len(page_list))

    for page in page_list:

        print(page)
        sleep(0.5)
        driver.get(page)    # 페이지 이동
        sleep(0.5)

        
        try:
            # 장르
            genre = driver.find_element(By.CSS_SELECTOR, '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > p > a:nth-child(3)').text
            # 조회수
            viewer = driver.find_element(By.CSS_SELECTOR,'#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_thumbnail_wrap > div.header_preference > button > span > span.button_text.js_preference_count').text
            # 총 화수
            series = driver.find_element(By.CSS_SELECTOR,'#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(4) > p.metadata.metadata_info_series_complete_wrap > span.metadata_item.book_count').text
            # 요일
            try:
                # option = driver.find_element(By.CSS_SELECTOR, #page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(4) > p.metadata.metadata_info_series_complete_wrap > span.metadata_item.not_complete).text
                try:
                    option = driver.find_element(By.CSS_SELECTOR,'#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(4) > p.metadata.metadata_info_series_complete_wrap > span.metadata_item.not_complete').text
                except:
                    option = driver.find_element(By.CSS_SELECTOR,'#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(4) > p.metadata.metadata_info_series_complete_wrap > span.metadata_item.complete').text                
                if(option == '미완결'):
                    menu = driver.find_element(By.CSS_SELECTOR, '#notice_component > ul > li > div:nth-child(1) > h4').text
                    if(menu == '연재'):
                        day = driver.find_element(By.CSS_SELECTOR, '#notice_component > ul > li > div:nth-child(1) > ul > li > h5').text
                    else:
                        day = '미완결'
                else:
                    day = '완결'
            except:
                if(option == '미완결'):
                    day = '미완결'
                else:
                    day = '완결'
            print(day)
            
            # 제목
            title = driver.find_element(By.CLASS_NAME, 'info_title_wrap').text
            print(title)
            # 작가
            author = driver.find_element(By.CSS_SELECTOR, '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_info_wrap > div:nth-child(4) > p.metadata.metadata_writer > span:nth-child(1) > a').text
            # 섬네일
            thumb = driver.find_element(By.CSS_SELECTOR, '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.header_thumbnail_wrap > div.header_thumbnail.book_macro_200.detail_scalable_thumbnail > div > div > div > img').get_attribute('src')
            # 줄거리
            story = driver.find_elements(By.CSS_SELECTOR, '#introduce_book > p')
            story = story[len(story)-1].text
            print(story)
            # 테그
            t = driver.find_elements(By.CSS_SELECTOR, '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_box_module.detail_keyword.js_detail_keyword_module > ul > li')
            tags = ""
            for tt in t:
                tag = tt.find_element(By.CSS_SELECTOR, '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_box_module.detail_keyword.js_detail_keyword_module > ul > li > button').get_attribute('data-tag-name')
                tags += tag + " "
            # 처음 연재한 날짜
            regist = driver.find_element(By.CSS_SELECTOR, '#page_detail > div.detail_wrap > div.detail_body_wrap > section > article.detail_header.trackable > div.Header_Metadata_Block > ul:nth-child(2) > li.Header_Metadata_Item.book_info.published_date_info > ul > li').text.split()[0]
            # 별점 
            try:
                grade = driver.find_element(By.CLASS_NAME, 'StarRate_Score').text.split('점')[0]
            except:
                grade = 0
        except:
            continue
        
        sleep(0.5)
        
        # 추가
        href_list.append(page)
        genre_list.append(genre)
        id_list.append(num) ; num += 1 
        title_list.append(title)
        author_list.append(author)
        img_list.append(thumb)
        story_list.append(story)
        tag_list.append(tags)
        regist_list.append(regist)
        grade_list.append(grade*2)
        day_list.append(day)
        viewer_list.append(viewer)
        series_list.append(series)
        platform_list.append("ridi")
###################################################################################
total_data = pd.DataFrame()
total_data['id'] = id_list
total_data['title'] = title_list
total_data['img'] = img_list ## 썸네일
total_data['author'] = author_list
total_data['day'] = day_list
total_data['genre'] = genre_list
total_data['story'] = story_list
total_data['tag'] = tag_list
total_data['viewer'] = viewer_list
total_data['grade'] = grade_list
total_data['regist'] = regist_list
total_data['series'] = series_list
total_data['href'] = href_list
total_data['platform'] = platform_list
total_data.to_csv('리디_웹툰.csv', encoding = 'utf-8-sig')