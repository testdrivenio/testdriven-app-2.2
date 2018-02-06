import sys
from io import StringIO


def lambda_handler(event, context):
    # get code from payload
    code = event['answer']
    test_code = code + '\nprint(sum(1,1))'
    # capture stdout
    buffer = StringIO()
    sys.stdout = buffer
    # execute code
    try:
        exec(test_code)
    except:
        return False
    # return stdout
    sys.stdout = sys.stdout
    # check
    if int(buffer.getvalue()) == 2:
        return True
    return False
