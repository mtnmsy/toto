# coding: UTF-8

import urllib.request, urllib.error
from bs4 import BeautifulSoup

class ScrapLearningSourceData:
    def __init__(self):
        self.teamNames = [] #チーム名の一覧
        self.matchResult = []

    # チーム名:teamName, 年:yearの試合結果を取得
    def scrapMatchResult(self,teamName, year):
        url = "http://www.football-lab.jp/" + teamName + "/match/?year=" + year;
        html = urllib.request.urlopen( url )
        soup = BeautifulSoup(html, "html.parser")

        divSoup = soup.find("div", class_="tUnit")
        trSoup = divSoup.find_all("tr")
        for tr in trSoup:
            print(tr)
            tdate = tr.find("td" , class_="tDate") #開催日

    # チーム名を取得
    def scrapTeamName(self):
        url = "http://www.football-lab.jp/summary/team_ranking/j1/?year=2017";
        html = urllib.request.urlopen( url )
        soup = BeautifulSoup(html, "html.parser")

        divSoup = soup.find("div", id="StandingSummary", class_="allbox")
        tdSoup = divSoup.find_all("td", class_="tName tTeamS")
        for td in tdSoup:
            self.teamNames.append(td.find("a").get("href").replace('/',''))

scrapLearningSourceData = ScrapLearningSourceData()
scrapLearningSourceData.scrapMatchResult("kasm", "2016")
