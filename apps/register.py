from conf.profile import PROJECT_KEY, SPRINT_ID, TASK_ID, USER_KEY
from django.conf import settings
import requests
import json
import os


def register_backend():
    if os.path.exists(os.path.join(settings.BASE_DIR, "actions.txt")) == False:
        if PROJECT_KEY != "":
            url = settings.OTMA_SERVER + "/api/otmasolucoes/melinux/management/actions/register?sprint=" + SPRINT_ID + "&session_key=&user_key=" + USER_KEY + "&action_type=BACKEND&tasks=" + TASK_ID + "&page="
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
            os.remove("project_ivis/actions.txt")
        except:
            pass
