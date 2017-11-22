import requests
from lxml.html import fromstring
from multiprocessing.dummy import Pool as ThreadPool

class UIMovement(object):
    def __init__(self):
        self.url = 'https://uimovement.com'
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        self.header = {'User-Agent': self.user_agent}
        self.records = []

    @staticmethod
    def get_inspiration_info(element):                      # 静态方法来提取数据
        href, title, src, author, desc = ['']*5
        try:
            href = 'https://uimovement.com' + element.cssselect('a[class="video-thumbnail-link"]')[0].get('href', '')
            title = element.cssselect('h6 a')[0].text
            src = 'https://uimovement.com' +  element.cssselect('video source')[0].get('src', '')
            author = element.cssselect('.home-page-design-meta small a:last-child')[0].text
            desc = ''   # 描述为空

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

        element_all = root.xpath('//div[@class="resources-wrapper"]')      # 拿到数据列表
        elements = element_all[:2] + element_all[3:]                    # 第三个元素是空的，需要跳过

        # 多进程处理
        pool = ThreadPool(8)
        self.records = pool.map(self.get_inspiration_info, elements)
        pool.close()
        pool.join()

        return self.records

