# project/tests/base.py


from flask_testing import TestCase

from project import create_app

app = create_app()


class BaseTestCase(TestCase):
    def create_app(self):
        app.config.from_object('project.config.TestingConfig')
        return app

    def setUp(self):
        pass

    def tearDown(self):
        pass
