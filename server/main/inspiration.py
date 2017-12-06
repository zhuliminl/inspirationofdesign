from flask import jsonify
from . import main

from server.spiders.awwwards import Awwwards
from server.spiders.dribbble import Dribbble
from server.spiders.uimovement import UIMovement
from server.spiders.zcool import Zcool

@main.route('/', methods=['GET', 'POST'])
def index():
    return '<h1>后台</h1>'

@main.route('/awwwards', methods=['GET'])
def get_awwwards_inspiration():
    awwwards = Awwwards()
    inspiration_list = awwwards.get_inspiration()

    response = jsonify(message = 'OK', data = inspiration_list)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response


@main.route('/dribbble', methods=['GET'])
def get_dribbble_inspiration():
    dribbble = Dribbble()
    inspiration_list = dribbble.get_inspiration()

    response = jsonify(message = 'OK', data = inspiration_list)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response


@main.route('/uimovement', methods=['GET'])
def get_uimovement_inspiration():
    uimovement = UIMovement()
    inspiration_list = uimovement.get_inspiration()

    response = jsonify(message = 'OK', data = inspiration_list)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response


@main.route('/zcooll', methods=['GET'])
def get_zcool_inspiration():
    zcool = Zcool()
    inspiration_list = zcool.get_inspiration()

    response = jsonify(message = 'OK', data = inspiration_list)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

@main.route('/zcool', methods=['GET'])
def get_zcool_inspirn():
    zcool = Zcool()
    inspiration_list = zcool.get_inspiration()

    response = jsonify(message = 'OK', data = inspiration_list)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

