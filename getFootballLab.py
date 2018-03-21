# coding: UTF-8
import re
import urllib.request, urllib.error
from bs4 import BeautifulSoup


class ScrapLearningSourceData:
    def __init__(self):
        self.teamNames = [] #チーム名の一覧
        self.matchResult = []

    # チーム名:teamName, 年:yearの試合結果を取得
    def scrapMatchResult(self, teamName, year):
        '''
            teamName: チーム名 (ex. kasm)
            year    : 年度 (ex. 2018)
        '''
        url = "http://www.football-lab.jp/" + teamName + "/match/?year=" + year;
        html = urllib.request.urlopen(url)
        soup = BeautifulSoup(html, "html.parser")

        divSoup = soup.find("div", class_ = "tUnit")
        trSoup = divSoup.find_all("tr")

        for tr in trSoup:
            if tr.find("td") is not None:
                tdate = tr.find("td", class_ = "tDate").string #開催日
                tSta = tr.find("td", class_ = "tSta").string # スタジアム名
                tTeam = tr.find("td", class_ = "tTeam").a.string # 対戦相手
                tWea = tr.find("td", class_ = "tWea").string # 天候
                tResult = tr.find("td", class_ = "tResult").img.get("alt") # 勝敗
                tgoal_for = re.sub('\s', '', tr.find("td", class_ = "tResult").a.contents[2]).split('-')[0]# 得点数
                tgoal_against = re.sub('\s', '', tr.find("td", class_ = "tResult").a.contents[2]).split('-')[1]# 失点数
                print(tgoal_for, tgoal_against)


    # チーム名を取得
    def scrapTeamName(self):
        url = "http://www.football-lab.jp/summary/team_ranking/j1/?year=2017";
        html = urllib.request.urlopen( url )
        soup = BeautifulSoup(html, "html.parser")

        divSoup = soup.find("div", id = "StandingSummary", class_ = "allbox")
        tdSoup = divSoup.find_all("td", class_ = "tName tTeamS")
        for td in tdSoup:
            self.teamNames.append(td.find("a").get("href").replace('/', ''))

scrapLearningSourceData = ScrapLearningSourceData()
scrapLearningSourceData.scrapMatchResult("kasm", "2016")
