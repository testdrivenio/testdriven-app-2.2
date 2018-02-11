# services/scores/project/tests/test_scores_model.py


from project.tests.base import BaseTestCase
from project.tests.utils import add_score


class TestScoreModel(BaseTestCase):

    def test_add_score(self):
        score = add_score(1, 1, True)
        self.assertTrue(score.id)
        self.assertEqual(score.user_id, 1)
        self.assertEqual(score.exercise_id, 1)
