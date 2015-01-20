#coding:utf-8

import json

f = open('all-tests.txt', 'r')
result = []
test = None
for line in f.readlines():
    line = line.strip()
    if len(line):
        if line.startswith('[I]'):
            if test is not None:
                result.append(test)
            test = {
                'no': line[3:],
                'choices': []
            }
        elif line.startswith('[Q]'):
            test['q'] = line[3:]
        elif line.startswith('[P]'):
            test['p'] = line[3:]
        else:
            test['choices'].append(line[3:])
result.append(test)
data = json.dumps(result, indent=4)
open('all-tests.json', 'w').write(data)