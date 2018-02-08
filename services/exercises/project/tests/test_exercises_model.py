# services/exercises/project/tests/test_exercises_model.py


from project.tests.base import BaseTestCase
from project.tests.utils import add_exercise


class TestExerciseModel(BaseTestCase):

    def test_add_exercise(self):
        exercise = add_exercise()
        self.assertTrue(exercise.id)
        self.assertTrue(exercise.body)
        self.assertEqual(exercise.test_code, 'sum(2, 2)')
        self.assertEqual(exercise.test_code_solution, '4')
