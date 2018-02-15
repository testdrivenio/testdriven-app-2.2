import sys
from io import StringIO


def lambda_handler(event, context):
    # get code, test, and solution from payload
    code = event['answer']
    test = event['test']
    solution = event['solution']
    test_code = code + '\nprint(' + test + ')'
    # capture stdout
    buffer = StringIO()
    sys.stdout = buffer
    # execute code
    try:
        exec(test_code)
    except Exception:
        return False
    # return stdout
    sys.stdout = sys.stdout
    # check
    if buffer.getvalue()[:-1] == solution:
        return True
    return False
