import requests
from lxml.html import fromstring
from multiprocessing.dummy import Pool as ThreadPool

class Zcool(object):
    def __init__(self):
        self.url = 'http://www.zcool.com.cn/'
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        self.header = {'User-Agent': self.user_agent}
        self.records = []

    @staticmethod
    def get_inspiration_info(element):                      # 静态方法来提取数据
        href, title, src, author, desc = ['']*5
        try:
            href = element.cssselect('p[class="card-info-title"] a')[0].get('href', '')
            title = element.cssselect('.card-info-title a')[0].text
            src = element.cssselect('.card-img img')[0].get('src', '')
            author = element.cssselect('.card-item span :first-child')[0].get('title', '')
            desc = element.cssselect('.card-info-type')[0].get('title', '')

        except IndexError:
            pass

        inspiration = {
                'title': title[:14],
                'src': src,
                'author': author,
                'desc': desc,
                'href': href
                }
        return inspiration

    def get_inspiration(self):
        r = requests.get(self.url,self.user_agent)
        page_source = r.text
        root = fromstring(page_source)

        elements = root.xpath('//div[@class="card-box"]')      # 拿到数据列表

        # 多进程处理
        pool = ThreadPool(8)
        self.records = pool.map(self.get_inspiration_info, elements)
        pool.close()
        pool.join()

        return self.records

