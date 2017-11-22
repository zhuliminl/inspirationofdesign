import requests
import re, json
from lxml.html import fromstring
from multiprocessing.dummy import Pool as ThreadPool

class Awwwards(object):
    def __init__(self):
        self.url = 'https://www.awwwards.com/'
        self.user_agent = 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'
        self.header = {'User-Agent': self.user_agent}
        self.records = []

    @staticmethod
    def get_inspiration_info(element):                      # 静态方法来提取数据
        href, title, src, author, desc = ['']*5
        try:
            href = element['url']
            title = element.get('site_name') or element.get('title')
            src = 'assets.awwwards.com/awards/media/cache/optimize/' +  element['image'] or ''
            author = element['user']['username']
            desc = element.get('slug', '')

        except IndexError:
            pass

        inspiration = {
                'href': href,
                'title': title,
                'src': src,
                'author': author,
                'desc': desc
                }
        return inspiration

    def get_inspiration(self):
        r = requests.get(self.url,self.user_agent)
        page_source = r.text
        root = fromstring(page_source)
        elements = []                                                # 储存元素数据，但是这次是 json 转 list 格式

        models_html_list = root.cssselect('ul[data-models]')         # 拿到 json 格式的 model  标签列表
        models_html_list.pop()                                       # 最后一项的数据格式不符
        for ul in models_html_list:
            json_data = ul.cssselect('ul[data-models]')[0].get('data-models', '')       # 在每个列表中获取具体的 json 字符串格式数据
            json_list = json.loads(json_data)                                           # json 转成 list
            for element in json_list:
                elements.append(element)                                                # 将每个 list 元素载入 总和列表


        # 多进程处理
        pool = ThreadPool(8)
        self.records = pool.map(self.get_inspiration_info, elements)
        pool.close()
        pool.join()

        return self.records

