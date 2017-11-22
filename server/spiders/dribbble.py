import requests
from lxml.html import fromstring
from multiprocessing.dummy import Pool as ThreadPool

class Dribbble(object):
    def __init__(self):
        self.url = 'https://dribbble.com'
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        self.header = {'User-Agent': self.user_agent}
        self.records = []

    @staticmethod
    def get_inspiration_info(element):                      # 静态方法来提取数据
        href, title, src, author, desc = ['']*5
        try:
            href = 'https://dribbble.com' + element.cssselect('a[class="dribbble-over"]')[0].get('href', '')
            title = element.cssselect('.dribbble-img strong:first-child')[0].text
            src_1x = element.cssselect('.dribbble-img picture :first-child')[0].get('srcset','')    # 可以试着将字段 1x 去掉，获得高清图
            src = src_1x.replace('_1x', '')
            author = element.cssselect('h2 span a:first-child')[0].get('href', '/')[1:]  # remove /
            desc = element.cssselect('.comment')[0].text

        except IndexError:
            pass

        inspiration = {
                'title': title,
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

        elements = root.xpath('//div[@id="main"]/ol/li')      # 拿到数据列表

        # 多进程处理
        pool = ThreadPool(8)
        self.records = pool.map(self.get_inspiration_info, elements)
        pool.close()
        pool.join()

        return self.records

