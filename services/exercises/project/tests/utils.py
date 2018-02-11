# services/exercises/project/tests/utils.py


from project import db
from project.api.models import Exercise


def add_exercise(
        body=('Define a function called sum that takes two integers as '
              'arguments and returns their sum'),
        test_code='sum(2, 2)',
        test_code_solution='4'):
    exercise = Exercise(
        body=body,
        test_code=test_code,
        test_code_solution=test_code_solution,
    )
    db.session.add(exercise)
    db.session.commit()
    return exercise
