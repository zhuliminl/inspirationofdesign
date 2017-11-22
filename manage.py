import os
from server import create_app
from flask_script import Manager, Server

app = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(app)

#  如何有数据库，在这里加入测试数据库的入口

if __name__ == '__main__':
    manager.run()
