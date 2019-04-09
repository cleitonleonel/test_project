import decimal
import os
import sys
from datetime import date, datetime, timedelta

import requests
import json

from django.conf import settings
from django.http import HttpResponse

from conf.profile import TASK_ID, USER_KEY, SPRINT_ID, PROJECT_KEY
from test_project.settings import OTMA_SERVER

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, date):
        return obj.isoformat()
    if isinstance(obj, datetime):
        return obj.isoformat()
    if isinstance(obj, timedelta):
        return str(obj)
    if isinstance(obj, decimal.Decimal):
        return float(obj)

    raise TypeError("Type %s not serializable" % type(obj))


def register_frontend(request, company_repository, project_name):
    #self.start_process(request)
    page = request.GET.get("page", "")
    session_key = request.session.session_key
    if session_key is None:
        session_key = "NOT_AUTHENTICATED"

    print("PRINT DA session_key: ", session_key)
    print("PRINT DA request: ", request)
    sprint = SPRINT_ID
    url = OTMA_SERVER + "/api/" + company_repository + "/" + project_name + "/management/actions/register?sprint=" + \
          sprint + "&session_key=" + session_key + "&user_key=" + USER_KEY + "&action_type=FRONTEND&tasks=" + TASK_ID + \
          "&page=" + page
    print("PRINT DA url: ", url)
    response = requests.get(url)
    response = json.loads(response.content)
    print("response 1: ", response)
    if response['result']:
        response_dict = {
            'result': True,
            'object': response['object'],
            'message': "Successfully saved action"
        }
    else:
        response_dict = {
            'result': False,
            'object': None,
            'message': "Error! Action not saved."
        }

    data = json.dumps(response_dict, default=json_serial)
    data = data.replace('RESPONSE_SIZE', str(sys.getsizeof(data) - 16))
    response = HttpResponse(data, content_type="application/json")  # after generate response noramlization reduce size in 16 bytes
    print("data: ", data)
    print("response 2: ", response)
    return response


def register_backend():
    if os.path.exists(os.path.join(settings.BASE_DIR, "actions.txt")) == False:
        if PROJECT_KEY != "":
            url = OTMA_SERVER + "/api/otmasolucoes/project_ivis/management/actions/register?sprint=" + SPRINT_ID + "&session_key=&user_key=" + USER_KEY + "&action_type=BACKEND&tasks=" + TASK_ID + "&page="
            response = requests.get(url)
            response = json.loads(response.content)
            if response['result'] == True:
                print("Ivis > Successfully saved backend action.")
                result = True
            else:
                print("Ivis > Error! Backend action can not be registered.")
            actions_file = open(os.path.join(settings.BASE_DIR, "actions.txt"), "w+")
            actions_file.close()
    else:
        try:
            os.remove("actions.txt")
        except:
            pass