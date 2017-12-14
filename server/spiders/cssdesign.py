import requests
from lxml.html import fromstring
from multiprocessing.dummy import Pool as ThreadPool

class Cssdesign(object):
    def __init__(self):
        self.url = 'https://cssdesignawards.com/'
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        self.header = {'User-Agent': self.user_agent}
        self.records = []

    @staticmethod
    def get_inspiration_info(element):                      # 静态方法来提取数据
        href, title, src, author, desc = ['']*5
        try:
            href = element.cssselect('a[class="sp__project-link"]')[0].get('href', '')
            title = element.cssselect('h3 a')[0].text
            src = 'https://cssdesignawards.com/' + element.cssselect('.single-project__thumbnail img')[0].get('src', '')
            author = 'unkonw'                     # 这里需要点击才能获取，暂时解决不了
            desc = ''

            # 削减多余的字符
            if len(title) > 29:
                title = title[:29] + '...'

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

        elements = root.xpath('//article[@class="single-project"]')      # 拿到数据列表

        # 多进程处理
        pool = ThreadPool(8)
        self.records = pool.map(self.get_inspiration_info, elements)
        pool.close()
        pool.join()

        return self.records

