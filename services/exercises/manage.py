# services/exercises/manage.py


import unittest
import coverage

from flask.cli import FlaskGroup

from project import create_app, db
from project.api.models import Exercise


app = create_app()
cli = FlaskGroup(create_app=create_app)

COV = coverage.coverage(
    branch=True,
    include='project/*',
    omit=[
        'project/tests/*',
        'project/config.py',
    ]
)
COV.start()


@cli.command()
def test():
    """ Runs the tests without code coverage"""
    tests = unittest.TestLoader().discover('project/tests', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


@cli.command()
def cov():
    """Runs the unit tests with coverage."""
    tests = unittest.TestLoader().discover('project/tests')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        COV.html_report()
        COV.erase()
        return 0
    return 1


@cli.command()
def recreate_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command()
def seed_db():
    """Seeds the database."""
    db.session.add(Exercise(
        body=('Define a function called sum that takes two integers as '
              'arguments and returns their sum.'),
        test_code='print(sum(2, 3))',
        test_code_solution='5'
    ))
    db.session.add(Exercise(
        body=('Define a function called reverse that takes a string as '
              'an argument and returns the string in reversed order.'),
        test_code='print(reverse(racecar))',
        test_code_solution='racecar'
    ))
    db.session.add(Exercise(
        body=('Define a function called factorial that takes a random number '
              'as an argument and then returns the factorial of that given '
              'number.'),
        test_code='print(factorial(5))',
        test_code_solution='120'
    ))
    db.session.commit()


if __name__ == '__main__':
    cli()
