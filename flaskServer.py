from flask import Flask, jsonify, request
from firebase import firebase
from json import loads, dumps
import time
import atexit
from apscheduler.schedulers.background import BackgroundScheduler

# determines in minutes how much time is elapsed from current time 
def timeElapsed(time1):
    currentTime = int(round(time.time() * 1000))
    time1 = int(time1)
    timeDifference = currentTime - time1
    millis = int(timeDifference)
    seconds=(millis/1000)%60
    seconds = int(seconds)
    minutes=(millis/(1000*60))%60
    minutes = int(minutes)
    return minutes

# determines whether or not to reschedule the task 
def renew(time1, duration):
    isRenew = False
    if (timeElapsed(time1) >= 10080 and duration == "Week"):
        isRenew = True
    elif (timeElapsed(time1) >= 1440 and duration == "Day"):
        isRenew = True
    elif (timeElapsed(time1) >= 60 and duration == "Hour"):
        isRenew = True
    return isRenew

# goes through all the tasks in the All tasks list and reschedules the tasks if needed
def reSchedule():
    base = firebase.FirebaseApplication('https://task-master-822ee.firebaseio.com', None)
    result = base.get('Users', None)
    for user in result:
        userAllTasks = (result[user]['Tasks']['All'])
        for task in userAllTasks:
            taskItem = userAllTasks[task]
            if (renew(taskItem['created'], taskItem['repeat'])):
                taskItem['created'] = int(round(time.time() * 1000))
                base.post('Users/' + user + '/Tasks/Not Started', taskItem)
                base.put('Users/' + user + '/Tasks/All/', task, taskItem)
                print("Added task" + str(taskItem))

#  cron job that runs reSchedule every minute
sched = BackgroundScheduler(daemon=True)
sched.add_job(reSchedule,'interval',minutes=1)
sched.start()
# Shutdown cron thread if the web process is stopped
atexit.register(lambda: sched.shutdown(wait=False))

app = Flask(__name__)

# get all tasks from all users
@app.route('/get_all_tasks')
def getUsersTasks():
    base = firebase.FirebaseApplication('https://task-master-822ee.firebaseio.com', None)
    result = base.get('Users', None)
    return jsonify(result)

# adds task
# /addTask, POST:
# {
#     'uid': String,
#     'task': {
#       'summary': String 
#       'priority': String
#       'repeat': {'none, hour, day, week'}
#     }
#     
# }
@app.route('/add_task', methods = ['POST'])
def addTask():

    if request.headers['Content-Type'] == 'application/json':
        base = firebase.FirebaseApplication('https://task-master-822ee.firebaseio.com', None)
        result = loads(dumps(request.json))
        uid = result['uid']
        task = result['task']
        task['created'] = int(round(time.time() * 1000))
        base.post('Users/' + uid + '/Tasks/All', task)
        return jsonify(base.post('Users/' + uid + '/Tasks/Not Started', task))


if __name__ == '__main__':
    app.run()